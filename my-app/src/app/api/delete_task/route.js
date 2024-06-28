
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db-config';
import taskModel from '@/lib/taskModel';

export const DELETE = async (req) => {
    try {
        await dbConnect();

        // get the task id from the request URL
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ message: "Task ID is required" }, { status: 400 })
        }

        // check if the task still exists
        const task = await taskModel.findById(id)
        if (!task) {
            return NextResponse.json({ message: "Task does not exist" }, { status: 404 })
        }

        // delete the task if it still exists
        await taskModel.findByIdAndDelete(id)

        // show success message
        return NextResponse.json({ message: "Task deleted" }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
};
