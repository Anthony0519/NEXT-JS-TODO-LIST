import mongoose from 'mongoose'
require("dotenv").config()
 
export default async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Success Connection");
    } catch (error) {
        throw new Error('Connection failed!')
    }
}