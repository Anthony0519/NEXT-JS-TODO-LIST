import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db-config';
import taskModel from '@/lib/taskModel';

export const GET = async () => {
    try {
        await dbConnect()
        const tasks = await taskModel.find().sort({createdAt:-1})
        if (!tasks || tasks.length === 0) {
            return NextResponse.json({ tasks: "No task created yet" }, { status: 404 })
        }

        // const order = await tasks.sort()

        return NextResponse.json({ tasks }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
};



