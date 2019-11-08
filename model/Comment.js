const mongoose=require('mongoose');

module.exports=mongoose.model("comments",new mongoose.Schema({
    title:{
        type:String,
        unique:true,
    },
    comment:{
        type:String,
        unique:true
    }
}));