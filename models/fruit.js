
//Fruits Model
const mongoose = require('./connection')
const { Schema, model } = mongoose //destructuring, grabbing model and schema off mongoose variable

const fruitsSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})

//Make fruit model
const Fruit = model("Fruit", fruitsSchema)
module.exports = Fruit