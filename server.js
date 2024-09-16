//***************************
//         IMPORTS
//***************************
const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const morgan = require("morgan")
const methodOverride = require("method-override")


//***************************
//   APP & CONFIGURATIONS
//***************************
dotenv.config()
// console.log("connection string: ", process.env.MONGODB_URI) //<- testing the UIR

const app = express()
const PORT = process.env.PORT || 3000

app.set("view engine", "ejs")

mongoose.connect(process.env.MONGODB_URI) //<- zopens connection to MongoDB

// mongoose event listener
mongoose.connection.on("connected", () => {
    // console.log(`Connected to MongoDB ${mongoose.connection.name}`)
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
app.use(methodOverride("_method"))
app.use(morgan("dev"))



//***************************
//         ROUTES
//***************************
// Home / Landing Page - GET -> ('/')
app.get('/', (req, res) => {
    // res.send("Home Page")   // <- testing the home page
    res.render("index")
})

// Index Page - GET -> ('/books')
app.get('/books', async (req, res) => {
    const allBooks = await Book.find()
    // console.log(allBooks)
    // res.send("Index Page")
    res.render("books/index", { books: allBooks})
})

// New Page - form page to add a new book - GET -> (/books/new)
app.get('/books/new', (req,res) => {
    // res.send("Form page to add a new book")
    res.render('books/new')
})

// Show Page - show book by id - GET -> (/books/:id)
app.get('/books/:id', async (req, res) => {
    // res.send(`Showing book page for ${req.params.id}`)

    try{
        // console.log(req.params)
        const foundBook = await Book.findById(req.params.id)
        res.render('books/show', {book: foundBook})
    } catch(err){
        console.log(err)
        res.redirect(`/`)
    }
})

// Post -> create a new Book doc - (/books)
app.post('/books', async (req, res) => {
    if(req.body.haveRead){  
        req.body.haveRead = true
    } else{
        req.body.haveRead = false
    }

    try{
        const createdBook = await Book.create(req.body)
        
        // res.status(200).send(createdBook)
        res.redirect('/books')  // <- prevents user from resubmitting form multi times
    } catch(err){
        console.log(err)
        res.status(400).json ({error: err.message})
    }
    // console.log(req.body)
})

// DELETE - deletes a book from the collection - (/books/:id)
app.delete('/books/:id', async (req, res) => {
    try{
        const deleteBook = await Book.findByIdAndDelete(req.params.id)
        // console.log("Response for DB deletion", deleteBook)
        res.redirect('/books')
    } catch(err){
        console.log(err)
        redirect('/')
    }
})


//***************************
//      SERVER HANDLER   
//***************************
app.listen(PORT, () => {
    console.log(`Listenting to PORT ${PORT}`)
})