require("dotenv").config() //load env variables
const express = require('express') //bring in express to make our app
const morgan = require('morgan') //nice logger for our request
const methodOverride = require('method-override') // allows us to request from our ejs
const mongoose = require ('mongoose') //gives us that db connection
const PORT = process.env.PORT


const Fruit = require('./models/fruit')
const FruitRouter = require('./controllers/fruit')
// const fruitController = require('./controllers/fruit')
const app = express()




//Middleware
app.use(morgan("tiny"))  //logging
app.use(methodOverride("_method")) //override for put and delete requests from forms
app.use(express.urlencoded({extended:true})) //parse urlencoded request bodies
app.use(express.static("public")) //serve files from public statically
app.use(FruitRouter)
// app.use(fruitController)


//Server Listener
app.listen(PORT, () => console.log(`who let the dogs out on port: ${PORT}`))

