import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db-config';
import taskModel from '@/lib/taskModel';

export const PUT = async(req,res)=>{
    try{
        await dbConnect()
       // Get the task id from the request URL
       const { searchParams } = new URL(req.url)
       const id = searchParams.get('id')

       if (!id) {
           return NextResponse.json({ message: "Task ID is required" }, { status: 400 })
       }
        // get thne update options
        const {task} = await req.json()

        // check if the task still exist
        const isValid = await taskModel.findById(id)
        if (!isValid ) {
            return NextResponse.json({ tasks: "Task does not exist" }, { status: 404 })
        }

        const updateTask = await taskModel.findByIdAndUpdate(id,{task},{new:true})
        return NextResponse.json({ task: updateTask }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}