//***************************
//         IMPORTS
//***************************
const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")



//***************************
//   APP & CONFIGURATIONS
//***************************
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.set("view engine", "ejs")

mongoose.connect(process.env.MONGODB_URI) //<- opens connection to MongoDB

// mongoose event listener
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

// mongoose event listener
mongoose.connection.on("error", (err) => {
    console.log(err)
})



//***************************
//       MIDDLEWARE
//***************************





//***************************
//         ROUTES
//***************************
// Home / Landing Page - ('/')
app.get('/', (req, res) => {
    // res.send("Home Page")   // <- testing the home page
    res.render("index")
})



//***************************
//      SERVER HANDLER   
//***************************
app.listen(PORT, () => {
    console.log(`Listenting to PORT ${PORT}`)
})