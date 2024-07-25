import userModel from '../../../lib/userModel'
import dbConnect from '../../../lib/db-config'
import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

export const POST = async(req)=>{

    try {
        await dbConnect()
        const {firstName,lastName,email,phoneNumber,password,gender,DOB} = await req.json()
        if(!firstName || !lastName || !email || !phoneNumber || !password || !gender || !DOB){
            return NextResponse.json({ error: 'please enter all fields' },{status:400})
        }
        const emailExist = await userModel.findOne({email})
        if(emailExist){
            return NextResponse.json({ error: 'Email already exists' },{status:400}) 
        }
        // hash the password
        const saltPass = await bcrypt.genSaltSync(10)
        const hash = await bcrypt.hashSync(saltPass)
        const user = await userModel.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            gender,
            DOB
        })
        // await user.save()
        // revalidatePath('/')
        return NextResponse.json({ message: `Registration Successfull `, data:user },{status:201}) 
    } catch (e) {
        console.log("error",e.message)
        return NextResponse.json({ error: `failed to cretate user ${e.meesge}`},{status:500})
    }
}
