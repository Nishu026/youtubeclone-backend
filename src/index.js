// require('dotenv').config() //can run  but use import
import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
    path:'./env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGO DB Connection failed",err)
})
