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
axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json')
    .then(response =>{
        const productData = response.data;

        // now inserting that data into mongodb

        ProductModel.insertMany(productData)
        .then(()=>console.log("Data inserted"))
        .catch((err=> console.error("Error inserting the data", err)))

    .catch(error=>{
        console.log(error('Error fetching data: ', error))
    })
})


 












// connecting backend with frontend
app.get('/getData',(req,res)=>{
    res.send("Server is ready")
})


app.listen(PORT, ()=>{
    console.log(`Server started at port: ${PORT}`);
})