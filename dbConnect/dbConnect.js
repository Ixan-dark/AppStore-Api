import mongoose from "mongoose";



export const dbConnect = async () => {
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected successfully`)
    } catch (error) {
        console.log("Error connnecting to Datbase", error)
        process.exit(1) //exit with failure
    }
}