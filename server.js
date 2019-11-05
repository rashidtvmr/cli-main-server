const express=require("express");
app=express();



app.set("view engine", "ejs");
app.set("views", "views");

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://rashidtvmr:Mass94877348@mycluster-ztbvh.mongodb.net/cli-main-server', {useNewUrlParser: true});

const {userRoute,
    commentRoute,
    nonUserCmntRoute 
    } =require('./routes/index');

app.use('/api/v1/user',userRoute);
app.use('/api/v1/cmt',commentRoute);
app.use('/api/v1/nu/cmt',nonUserCmntRoute);


app.use(express.static('public'));
app.get("/",(req,res)=>{res.render("index")});


let port=process.env.PORT || 4938;
app.listen(port,()=>{
    console.log("app is running at ",port);
})