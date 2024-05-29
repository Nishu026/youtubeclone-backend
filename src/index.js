// require('dotenv').config() //can run  but use import
import dotenv from 'dotenv'
import connectDB from "./db/index.js";

dotenv.config({
    path:'./env'
})
connectDB()


// import mongoose from 'mongoose';
// import { DB_NAME } from './constants';

// ;(async()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
//     }catch(error){
//         console.error("Error: ", error);
//         throw err
//     }
// })()