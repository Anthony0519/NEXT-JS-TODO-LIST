import taskModel from '../../../lib/taskModel'
import dbConnect from '../../../lib/db-config'
import { NextResponse } from 'next/server';

export const POST = async (req)=>{
    try{
        const {task} = req.json()
        await dbConnect()
        await taskModel.create({task})

        return NextResponse.json({ message: "Task created"},{status:201})
    }catch(e){
        return NextResponse.json({message:`error creating task: ${e.message}`},{status:500})
    }
}