import mongoose from 'mongoose'
  
const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true , unique: true},
        gender: { type: String },
        phoneNumber: { type: Number },
        DOB: { type: String },
        password:{type: String, required: true}
    },
    {
        timestamps: true,
    }
)
 
const userModel = mongoose.models.User || mongoose.model('User', userSchema)
export default userModel