// require('dotenv').config({path: "./env"})   is se run tu ho jaya ga per yaha required aur ham import use ker raha hai jis se code ki terteb kharab hoti hai 
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import express from "express"
const app = express();

dotenv.config({
    path: "./env"  // root directry per hi env file hai
})



connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => console.log(`Server is running at port: ${process.env.PORT}`))

    // handaling error if db not working with listen
    app.on("Error", (error)=>{
        console.log("ERROR: ", error)
        throw error;
    })
})







/*

// iffi function ( async ()=> {})()    error function automatically call ho jaya ga ab 
( async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) // database connetion 
        app.on("error", (error)=>{   // hamari database tu kam ker rahi hai per database express ka app se bat ni ker rahi is leya ya error handaler likta hai 
            console.log("Error: ", error)
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on port ${process.env.PORT}`)
        })


    } catch (error) {
        console.error("ERROR", error)
        throw error
    }
})()

*/