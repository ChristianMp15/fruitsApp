require("dotenv").config()
const mongoose = require('mongoose')
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
.on("error", (error) => console.log("Mongoose Error", error))

//export mongoose with connection
module.exports = mongoose