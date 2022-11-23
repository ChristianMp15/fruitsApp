const express = require('express')
const Fruit = require('../models/fruit')

///
//create Router variable to attach
///
const router = express.Router()

//Actual routes below
//Routes
router.get("/", (req, res) => {
    res.send("Your server is running... better catch it")
})

router.get('/fruits/seed', (req, res) => {
    //define data we want to put in the database
    
})

router.get('/fruits', (req, res) => {
    // Get all fruits from mongo and send them back
    Fruit.find({})
    .then((fruits) => {
        res.render('fruits/index.ejs', { fruits })
        

    })
    .catch(err => console.log(err))
})

router.get('/fruits/new', (req, res) =>{
    res.render('fruits/new.ejs')
})

router.post('/fruits', (req, res) =>{
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false
    Fruit.create(req.body, (err, createdFruit) =>{
        console.log(createdFruit)
        res.redirect('/fruits')
    })
})

router.get('/fruits/:id/edit', (req, res) =>{
    const id = req.params.id
    Fruit.findById(id, (err, foundFruit) =>{
        //res.json()
        res.render('fruits/edit.ejs', { fruit: foundFruit})
    })
})
//Update the database using the Id

router.put('/fruits/:id', (req, res) =>{
    Fruit.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, updateFruit) =>{
        console.log(updateFruit)
        res.redirect('/fruits/$(req.params.id')
    })
})

router.get('/fruits/:id', (req, res) =>{
    //Go get fruit from the database
    Fruit.findById(req.params.id)
    .then((fruit) => {
        res.render('fruits/show.ejs', {fruit})
    })
})

router.delete('/fruits/:id', (req, res) =>{
    Fruit.findByIdAndDelete(req,params.id, (err, deletedFruit) =>{
        res.redirect('/fruits')
    })
})


//Export this router to use in other files
module.exports = router