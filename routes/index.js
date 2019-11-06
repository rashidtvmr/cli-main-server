let userRoute=require('express').Router();
let commentRoute=require('express').Router();
let nonUserCmntRoute=require('express').Router();

let {userController}=require('../controller/index');
let isAuth=require('../middleware/auth');
/**
 * user route will handle route to /api/v1/user/
 */

userRoute.post('/login',userController.loginUser); 

// this will create a new user NOTE:POST request
userRoute.post('/',userController.createUser);

// this will return a all user
userRoute.get('/all',(req,res)=>{
    res.json("get all user")
});

// this will return a particular user
userRoute.get('/',isAuth,userController.getSingleUser);


// this route handle user profile update
userRoute.put('/:id',isAuth,userController.updateUser);

// this route will handle user account deletion
userRoute.delete('/:id',isAuth,userController.deleteUser);



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