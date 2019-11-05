let userRoute=require('express').Router();
let commentRoute=require('express').Router();
let nonUserCmntRoute=require('express').Router();
/**
 * user route will handle route to /api/v1/user/
 */

 // this will create a new user NOTE:POST request
userRoute.post('/',(req,res)=>{
    res.json("post user")
});

// this will return a particular user
userRoute.get('/:id',(req,res)=>{
    res.json("get particular user"+req.params.id);
});

// this will return a all user
userRoute.get('/',(req,res)=>{
    res.json("get all user")
});

// this route handle user profile update
userRoute.put('/:id',(req,res)=>{
    res.json("update particular user"+req.params.id);
});

// this route will handle user account deletion
userRoute.delete('/:id',(req,res)=>{
    res.json("dlt user"+req.params.id);
});

// <---- Comment section  ----->

 // this will create a new user NOTE:POST request
 commentRoute.post('/',(req,res)=>{
    res.json("create a post");
});

// this will return a particular user
commentRoute.get('/:id',(req,res)=>{
    res.json("get a post");
});

// this route handle user profile update
commentRoute.put('/:id',(req,res)=>{
    res.json("update a post");
});

// this route will handle user account deletion
commentRoute.delete('/:id',(req,res)=>{
    res.json("dlt a post");
});


// <----- Non user comment section ----->
 // this will create a new post NOTE:POST request
 nonUserCmntRoute.post('/',(req,res)=>{
    res.json("create nu a post");
});

// this will return a particular post
nonUserCmntRoute.get('/:id',(req,res)=>{
    res.json("get a nu post");
});

// this route handle commment update
nonUserCmntRoute.put('/:id',(req,res)=>{
    res.json("update a nu post");
});

// this route will handle comemnt deletion
nonUserCmntRoute.delete('/:id',(req,res)=>{
    res.json("dlt a nu post");
});





module.exports={
    userRoute,
    commentRoute,
    nonUserCmntRoute
}