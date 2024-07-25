'use client';
import styles from './page.module.css';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
    const [info, setInfo] = useState({ task: "" });
    const [tasks, setTasks] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [currentTask, setCurrentTask] = useState({ id: '', task: '' });
    const [pending, setPending] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const ref = useRef(null);

    const allTask = async () => {
        try {
            const res = await fetch('/api/all_task');
            const data = await res.json();
            if (res.ok) {
                setTasks(data.tasks);
                console.log('Tasks fetched successfully');
            } else {
                console.error('Error fetching tasks:', data);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    useEffect(() => {
        allTask();
    }, []);

    const handleInput = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            setPending(true);
            const res = await fetch('/api/add_task', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(info)
            });
            const data = await res.json();
            if (res.ok) {
                setPending(false);
                setSuccess('Task created successfully');
                const form = e.target;
                form.reset();
                allTask();
            } else {
                setError(data.error);
                setPending(false);
            }
        } catch (error) {
            setError(`Something went wrong on client side. ${error.message}`);
            setPending(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/delete_task?id=${id}`, {
                method: "DELETE"
            });
            if (res.ok) {
                setTasks(tasks.filter(task => task._id !== id));
                console.log('Task deleted successfully');
            } else {
                console.error('Error deleting task', res);
            }
        } catch (error) {
            console.error('Error deleting tasks:', error);
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/edit_task?id=${currentTask.id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task: currentTask.task })
            });
            const data = await res.json();
            if (res.ok) {
                setTasks(tasks.map(task => task._id === currentTask.id ? data.task : task));
                setEditMode(false);
                setCurrentTask({ id: '', task: '' });
                console.log('Task updated successfully');
            } else {
                console.error('Error updating task:', data);
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    const handleEditMode = (task) => {
        setEditMode(true);
        setCurrentTask({ id: task._id, task: task.task });
    };

    return (
        <main className={styles.main}>
            <form ref={ref} className={styles.form} onSubmit={editMode ? handleEdit : handleSubmit}>
                <div className={styles.caption}>
                    <h1>PLAN YOUR DAY...</h1>
                </div>
                <div className={styles.addTask}>
                    <div className={styles.inputHolder}>
                        <input
                            type="text"
                            placeholder={editMode ? "Edit Task" : "Enter Task"}
                            name="task"
                            value={editMode ? currentTask.task : info.task}
                            onChange={editMode ? (e) => setCurrentTask({ ...currentTask, task: e.target.value }) : handleInput}
                            required
                        />
                        <button type="submit" disabled={pending}>
                            {pending ? (editMode ? "Editing..." : "Adding...") : (editMode ? "Edit" : "ADD")}
                        </button>
                    </div>
                </div>
                {error && <span className={styles.error}>{error}</span>}
                {success && <span className={styles.success}>{success}</span>}
            </form>
            <div className={styles.taskList}>
                <div className={styles.taskListholder}>
                    {tasks.length === 0 ? (
                        <h2 style={{ color: "#935ABE", fontSize: "24px", fontFamily: "Arial, sans-serif" }}>
                            You don't have any active tasks yet
                        </h2>
                    ) : (
                        tasks.map((task) => (
                            <div key={task._id} className={styles.taskItem}>
                                <span>{task.task}</span>
                                <div className={styles.taskButtons}>
                                    <button className={styles.editButton} onClick={() => handleEditMode(task)}>Edit</button>
                                    <button className={styles.deleteButton} onClick={() => handleDelete(task._id)}>Delete</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}
