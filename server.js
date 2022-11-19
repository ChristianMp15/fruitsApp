require("dotenv").config() //load env variables
const express = require('express') //bring in express to make our app
const morgan = require('morgan') //nice logger for our request
const methodOverride = require('method-override') // allows us to request from our ejs
const mongoose = require ('mongoose') //gives us that db connection

const PORT = process.env.PORT

const app = express()

//Data base connection

const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

//Establish our connections
mongoose.connect(DATABASE_URL, CONFIG)

//Log connections events from mongoose
mongoose.connection
.on("open", () => console.log("Mongoose Connected"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log("Mongoose Error", error));

//Fruits Model
const { Schema, model } = mongoose //destructuring, grabbing model and schema off mongoose variable

const fruitsSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})

//Make fruit model
const Fruit = model("Fruit", fruitsSchema)

//Middleware
app.use(morgan("tiny"))  //logging
app.use(methodOverride("_method")) //override for put and delete requests from forms
app.use(express.urlencoded({extended:true})) //parse urlencoded request bodies
app.use(express.static("public")) //serve files from public statically

//Routes
app.get("/", (req, res) => {
    res.send("Your server is running... better catch it")
})

app.get('/fruits/seed', (req, res) => {
    //define data we want to put in the database
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
      ]
      //Delete all fruits
      Fruit.deleteMany({}, (err, data) => {
        //create new fruits once old fruits are deleted
        Fruit.create(startFruits, (err, createdFruits) =>{
            //send starter fruits
            res.json(createdFruits)
        })
      })
})

app.get('/fruits', (req, res) => {
    // Get all fruits from mongo and send them back
    Fruit.find({})
    .then((fruits) => {
        res.render('fruits/index.ejs', { fruits })
        

    })
    .catch(err => console.log(err))
})

app.get('/fruits/new', (req, res) =>{
    res.render('fruits/new.ejs')
})

app.post('/fruits', (req, res) =>{
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false
    Fruit.create(req.body, (err, createdFruit) =>{
        console.log(createdFruit)
        res.redirect('/fruits')
    })
})

app.get('/fruits/:id', (req, res) =>{
    //Go get fruit from the database
    Fruit.findById(req.params.id)
    .then((fruit) => {
        res.render('fruits/show.ejs', {fruit})
    })
})

//Server Listener
app.listen(PORT, () => console.log(`who let the dogs out on port: ${PORT}`))

