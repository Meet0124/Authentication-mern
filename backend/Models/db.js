import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = async () => {
    try{
      const conn =  await mongoose.connect(process.env.MONGO_URL);
      console.log(`DB connected! ${conn.connection.host}`);
        
    } catch(error){
        console.error("DB connection failed", error)
    }
}

export default dbConnection;
