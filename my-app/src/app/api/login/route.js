import userModel from '../../../lib/userModel'
import dbConnect from '../../../lib/db-config'
import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

export const POST = async(req)=>{
    try{
        await dbConnect()
        // get the requirement
        const {email,password} = await req.json() 

        if(!email || !password){
            return NextResponse.json({ error: 'please enter all fields' },{status:400})
        }
        // check if user exist
        const emailExist = await userModel.findOne({email})
        if(!emailExist){
            return NextResponse.json({ error: 'email does not exists' },{status:400}) 
        }
        // check if password is correct
        const checkPass = await bcrypt.compareSync(password,emailExist.password)
        if(!checkPass){
            return NextResponse.json({ error: 'Incorrect Password' },{status:400}) 
        }

        const token = await jwt.sign({
            userId:emailExist._id,
            Tel:emailExist.phoneNumber
        },process.env.JWT_SECRET,{expiresIn:"1d"})

        // show success message 
        return NextResponse.json({message:"successfuly loggedIn"},{status:200})


    }catch(error){
       return NextResponse.json({error:error.message},{status:500})
    }
}