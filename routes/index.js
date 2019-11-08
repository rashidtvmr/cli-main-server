let {userController}=require('../controller/index');
let isAuth=require('../middleware/auth');

let userRoute=require('express').Router();
let commentRoute=require('express').Router();
let nonUserCmntRoute=require('express').Router();

const { check } = require('express-validator');

/**
 * user route will handle route to /api/v1/user/
 */

userRoute.post(
    '/login',
    [
        check('username').isLength({ min: 3 }).withMessage("Üsername is required"),
        check('password').isLength({ min: 5 }).withMessage("Password should be minimum 6 characters")
    ],
    userController.loginUser); 

// this will create a new user NOTE:POST request
userRoute.post(
    '/',
    [
        check('username').trim().not().isEmpty().withMessage("Üsername is required").trim().escape(),
        check("email").trim().isEmail().normalizeEmail().withMessage("Invalid Email"),
        check('password').trim().isLength({ min: 5 }).withMessage("Password should be minimum 6 characters")
    ]
    ,userController.createUser);

// this will return a all user
userRoute.get('/all',(req,res)=>{
    res.json("get all user")
});


// this will return a particular user
userRoute.get('/',isAuth,userController.getSingleUser);


// this route handle user profile update
userRoute.put(
    '/',[
        check('username').optional().trim().isLength({min:3}).withMessage("User Name must be 3 character long"),
        check("email").optional().trim().isEmpty().withMessage("Invalid Email"),
        check('password').optional().trim().isLength({min:6}).withMessage("Password must be 6 or more characters")
    ]
    ,isAuth,
    userController.updateUser);


// this route will handle user account deletion
userRoute.delete('/',isAuth,userController.deleteUser);



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