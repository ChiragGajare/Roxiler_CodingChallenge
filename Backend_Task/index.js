const express = require('express')
const app = express()
const PORT = 8080
const axios = require('axios')
const ProductModel = require('./productsDB')
const cors = require('cors')
app.use(cors())
 

//connecting mongodb

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/NewRCC')

//fetching the json

// axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json')
//     .then(response =>{
//         const productData = response.data;

//         // now inserting that data into mongodb

//         ProductModel.insertMany(productData)
//         .then(()=>console.log("Data inserted"))
//         .catch(err=> console.log(err))

//     .catch(error=>{console.log(error)
//     })
// })




// connecting backend with frontend
// app.get('/sample',(req,res)=>{
//     res.send("Server is ready")
// })


// API for listing all the transactions on to the webpage
app.get('/transactions',(req,res)=>{
    ProductModel.find()
    .then(trans=>res.json(trans))
    .catch(err=>res.json(err))
})



//API for making a bar chart for the transactions




app.listen(PORT, ()=>{
    console.log(`Server started at port: ${PORT}`);
})