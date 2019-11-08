const mongoose=require('mongoose');

module.exports=mongoose.model("comments",new mongoose.Schema({
    title:{
        type:String,
    },
    comment:{
        type:String,
    },
    owner:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"Users"
    }
}));