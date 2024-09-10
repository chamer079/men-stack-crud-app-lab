//***************************
//         IMPORTS
//***************************
const express = require("express")




//***************************
//   APP & CONFIGURATIONS
//***************************
const app = express()
const PORT = process.env.PORT || 3000

app.set("view engine", "ejs")



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