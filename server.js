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
const Book = require('./models/book')
// console.log(Book)   // <- testing if importing from models folder


//***************************
//       MIDDLEWARE
//***************************
// app.use() - allows to plug additional functionality into express
app.use(express.urlencoded({ extended: false }))    // <- decodes the form data - stores the key:value pair in req.body




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

// Post -> (/books)
app.post('/books', async (req, res) => {
    if(req.body.haveRead === "on"){  
        req.body.haveRead = true
    } else{
        req.body.haveRead = false
    }

    try{
        const createdBook = await Book.create(req.body)
        
        res.status(200).send(createdBook)
        res.redirect('/books/new')  // <- prevents user from resubmitting form multi times
    } catch(err){
        console.log(err)
        res.status(400).json ({error: err.message})
    }
    
    // console.log(req.body)
    res.redirect('/books')
})


//***************************
//      SERVER HANDLER   
//***************************
app.listen(PORT, () => {
    console.log(`Listenting to PORT ${PORT}`)
})