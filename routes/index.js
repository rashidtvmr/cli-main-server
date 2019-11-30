let isAuth=require('../middleware/auth');

let userRoute=require('express').Router();
let commentRoute=require('express').Router();

const { check } = require('express-validator');
const {userController,commentController}=require('../controller/index');

/**
 * user route will handle route to /api/v1/user/
 */

/** handle login route(/api/v1/usr/login) ;req body is {"username":"","password":""} */
userRoute.post(
    '/login',
    [  //this array is middleware to validate req body 
        check('username').isLength({ min: 3 }).withMessage("Üsername is required"),
        check('password').isLength({ min: 5 }).withMessage("Password should be minimum 5 characters")
    ],
    userController.loginUser
    ); 

/** route to create new user POST:/api/v1/user ; req body is  {"username":"",email:"","password":""} */
userRoute.post(
    '/',
    [
        check('username').trim().not().isEmpty().withMessage("Üsername is required").trim().escape(),
        check("email").trim().isEmail().normalizeEmail().withMessage("Invalid Email"),
        check('password').trim().isLength({ min: 5 }).withMessage("Password should be minimum 6 characters")
    ]
    ,userController.createUser
    );

// route to get all user GET:/api/v1/user/all
userRoute.get(
    '/all',
    (req,res)=>{
        res.json("get all user")
    });


// route to get loggedin user
userRoute.get(
    '/',
    isAuth,
    userController.getLoggedinleUser
    );


/** route to update user PUT:/api/v1/user ;request body {"username":"","email":"","password":""} 
 *  all request body fields are optional
 */
userRoute.put(
    '/',[
        check('username').optional().trim().isLength({min:3}).withMessage("User Name must be 3 character long"),
        check("email").optional().trim().isEmpty().withMessage("Invalid Email"),
        check('password').optional().trim().isLength({min:6}).withMessage("Password must be 6 or more characters")
    ]
    ,isAuth,
    userController.updateUser
    );


// route to delete user
userRoute.delete(
    '/',
    isAuth,
    userController.deleteUser
    );



// <---- Comment section  ----->

 
 // this will create a new user NOTE:POST request
 commentRoute.post(
     '/',
     isAuth,[
         check('title').trim().not().isEmpty().withMessage("Title is required"),
         check('comment').trim().isLength({min:10}).withMessage("Description shoul be 10 character or more!!")
     ],
     commentController.addComment);

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






module.exports={
    userRoute,
    commentRoute
}