'use server'
import userModel from './userModel'
import taskModel from './taskModel'
import dbConnect from './db-config'


export const createUser = async (prevState, formData)=>{

    const data = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phoneNumber: formData.get("phoneNumber"),
        gender: formData.get("gender"),
        DOB: formData.get("DOB"),
        password: formData.get("password"),
    }

    try {
        await dbConnect()
        const user = new userModel(data)
        await user.save()
        // revalidatePath('/')
        return { message: `user Created` }
    } catch (e) {
        return { error: 'Failed to create user' + e.message }
    }
}

export const addTask = async (prevState, formData)=>{
    const data = {
        task: formData.get("task"),
    }

    try{
        await dbConnect()
        await taskModel.create(data)

        // fetch all task from DB
        // const tasks = await taskModel.find().sort("createdAt")

        return { message: "Task created"}
    }catch(e){
        return {message:`error creating task: ${e.message}`}
    }
}

