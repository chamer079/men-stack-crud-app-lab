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
// console.log("connection string: ", process.env.MONGODB_URI) //<- testing the UIR

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

// import mongoose models
const Book = require('./models/books')
// console.log(Book)   // <- testing if importing from models folder


//***************************
//       MIDDLEWARE
//***************************





//***************************
//         ROUTES
//***************************
// Home / Landing Page - GET -> ('/')
app.get('/', async (req, res) => {
    // res.send("Home Page")   // <- testing the home page
    res.render("index")
})

// New Page - form page to add a new book - GET -> (/books/new)
app.get('/books/new', (req,res) => {
    // res.send("Form page to add a new book")
    res.render('books/new')
})


//***************************
//      SERVER HANDLER   
//***************************
app.listen(PORT, () => {
    console.log(`Listenting to PORT ${PORT}`)
})