'use client';
import styles from './page.module.css'
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { addTask } from '@/lib/action'

export default function Home() {
    const [state, formAction] = useFormState(addTask, {message:'', tasks: []});
    const { pending } = useFormStatus();
    const ref = useRef(null);
    const [tasks, setTasks] = useState([])
    const [editMode, setEditMode] = useState(false);
    const [currentTask, setCurrentTask] = useState({ id: '', task: '' });

    const allTask = async()=>{
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

    useEffect(()=>{
        allTask()
    },[])

    useEffect(() => {
        console.log('State message:', state.message);
        if (typeof state.message === 'string' && state.message.indexOf('Task created') === 0) {
            ref.current?.reset();
            console.log('Task created successfully:', state.message);
            allTask()
            console.log('All tasks available:', state.tasks);
        } else if (state.message) {
            console.log('Error or other message:', state.message);
        }
    }, [state.message]);

    const handleDelete = async(id)=>{
        try{
            const res = await fetch(`/api/delete_task?id=${id}`,{
                method:"DELETE"
            })
            if(res.ok){
                setTasks(tasks.filter(task => task._id !==id))
                console.log('Task deleted successfully');
            } else {
                console.error('Error deleting task',res);
            }
        } catch (error) {
            console.error('Error deleting tasks:', error);
        }
    }

    const handleEdit = async(e)=>{
        e.preventDefault 
        try{
    
            const res = await fetch(`api/edit_task?id=${currentTask.id}`,{
                method:"PUT",
                headers:{ 'Content-Type': 'application/json' },
                body: JSON.stringify({task:currentTask.task}),
            })
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
            console.error('Error fetching tasks:', error);
        }
}

    const handleEditMode = (task) => {
        setEditMode(true);
        setCurrentTask({ id: task._id, task: task.task });
    };

    return (
        <main className={styles.main}>
            <form ref={ref} className={styles.form} action={formAction}>
                <div className={styles.caption}>
                    <h1>PLAN YOUR DAY...</h1>
                </div>
                <div className={styles.addTask}>
                    <div className={styles.inputHolder}>
                    <input
                            type="text"
                            placeholder={editMode ? "Edit Task" : "Enter Task"}
                            name="task"
                            value={editMode ? currentTask.task : undefined}
                            onChange={editMode ? (e) => setCurrentTask({ ...currentTask, task: e.target.value }) : undefined}
                            required
                        />
                         <button
                            type={editMode ? "button" : "submit"}
                            disabled={pending}
                            onClick={editMode ? handleEdit : undefined}
                        >
                            {editMode ? "Edit" : "ADD"}
                        </button>
                    </div>
                </div>
            </form>
            <div className={styles.taskList}>
                <div className={styles.taskListholder}>
                    {tasks.length === 0 ? (
                        <h2 style={{color:"#935ABE", fontSize: "24px", fontFamily: "Arial, sans-serif"}}>
                            You don't have any active task yet
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
