import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://nv571020:resume123@cluster0.i9kffjk.mongodb.net/RESUME')
    .then(() => console.log("DB CONNECTED"))
}