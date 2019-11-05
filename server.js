const express=require("express");
app=express();



const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});


let port=process.env.PORT || 4938;
app.listen(port,()=>{
    console.log("app is running at ",port);
})