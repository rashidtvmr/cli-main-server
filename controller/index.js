const _=require("lodash")
const User=require('../model/User');
const { validationResult } = require('express-validator')
// Create User
let userController={};

// Usercreate Controller
userController.createUser=(req,res,next)=>{
    
    // To catch error thrown by express-validator
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){  // If the provided body is not valid 
        console.log("Validation error:",errors.errors)
        next({code:409,msg:errors.errors[0].msg});
    
    }else{ // after validating request body

        let body=req.body;

        let user=new User(body);  //Creating new User data

        user.save().then(userSaved=>{  // Saving the created data

            let response={
                status:"success",
                msg:"User created successfully",
                // To generate JWT for createdUser(Look for this function inside User model(./model/User.js))
                token:userSaved.generateAuthToken()  
            }
            res.status(200).json(response);

        }).catch(unsavedUser=>{
            
            console.log("Error while creating user:",unsavedUser);
            
            // handling data_duplication error (since username,email are unique field)
            if(unsavedUser.code === 11000){

                next({code:409,msg:"username or email already exist:"+unsavedUser.errmsg});
            
            }else{
             
                next({code:400,msg:"Unable to create user"});
            }
        });
    }
}

// login controller
userController.loginUser=(req,res,next)=>{
    
    let errors=validationResult(req);
    
    if(!errors.isEmpty()){
        next({code:409,msg:errors.errors});
    }else{
    
        let body=req.body;
        
        User.findOne({username:body.username}).then(existingUser=>{
            
            if(!existingUser) // when user with username is returned null
                next({code:400,msg:"Invalid username"});
            else{ // when user exist user instance is stored at existingUser object

                //existingUser contain comparePassword,generateAuthToken,and other function defined inside model
                existingUser.comparePassword(body.password,(err,isMatch)=>{
                    
                    if(!isMatch) // If password doesnt match it isMatch is false
                        next({code:400,msg:"Invalid password"});

                    else{ // when password matched

                        let response={};
                        response.token=existingUser.generateAuthToken();
                        response.msg="Logged in successfully";
                        response.status=200;
                        response.username=existingUser.username;
                        response.email=existingUser.email;
                        res.status(200).json(response);
                    }
                });
            }
        }).catch(err=>{
            console.log("Error while loggingin user:",err);
            next({code:500,msg:"Unable to logged in user"});
        });
    }
}

// controller to get logged in user data
userController.getLoggedinleUser=(req,res,next)=>{

    /** while routing to this contoller function the request is authenticated by
     *  auth middleware if authentication is successfull req.user object is created
     * where req.user.id contain the authenticated user id
    */
    
    if(_.isUndefined(req.user.id)) // if un authenticated user
        next({code:401,msg:"Unauthorized Access"});

    else // if request is authentic
        User.findOne({id:req.user.id}).then(singleUser=>{
            if(singleUser){
                let response={
                    username:singleUser.username,
                    email:singleUser.email,
                    msg:"User exist",
                    status:"success"
                }
                res.status(200).json(response);
            }else{
                next({code:400,msg:"Invalid user id"});
            }
        }).catch(err=>{
            console.log("Error while getting single user:",err)
            next({code:500,msg:"Unable to get single user"});
        });
}

// contoller to update User
userController.updateUser=(req,res,next)=>{
    
    console.log('Update User.....')
    
    if(_.isUndefined(req.user.id))
        next({code:401,msg:"Unauthorized Access"});
    
    else{
        let errors=validationResult(req);
        
        if(!errors.isEmpty()){
            console.log("Validation Error",errors.errors);
            next({code:409,msg:errors.errors});

        }else{

            const id = req.user.id;
            const body = req.body;
            return User.findById(id, (err, user) => {
            if (err) {
                console.log("DB error.user.update", err);
                return next({code:500,msg:"Unable to update"});
            }
            if (!user) {
                console.log('No User found');   
                return next({code:400,msg:"Invalid user id"});
            }

            // updating the user data if exist in req.body other old data is used
            user.username = body.username || user.username;
            user.email = body.email || user.email;
            return user.save((err, result) => {
                if (err) {
                    if (err.code === 11000) {
                        next({code:409,msg:"username or email already exist:"+err.errmsg});
                    }else{
                        console.log("User update error:",err);
                        next({code:500,msg:"Unable to update user"})
                    }
                }else{
                    let response = { ...result._doc };
                    response.status = 200;
                    response.msg = "Successfully updated user";
                    return res.status(200).json(response);
                }
            });
         });
        
        }
        
    }
}

// controller to delete user data
userController.deleteUser=(req,res,next)=>{
    if(_.isUndefined(req.user.id))
        next({code:401,msg:"Unauthorized Access"});
    else{
        User.findOneAndDelete({_id:req.user.id},(err,deletedUser)=>{
            if(err){
                console.log("Error while deleting user:",err);
                next({code:500,msg:"User will not be deleted"});
            }else{
                console.log("User Removed:",deletedUser)
                res.status(200).json({msg:"User deleted successfully",status:200})
            }
        });
    }
}


let commentController={};
let Comment=require('../model/Comment');
commentController.addComment=(req,res,next)=>{
    const errors=validationResult(req);
    if(! errors.isEmpty()){
        next({code:401,msg:error.errors[0].msg})
    }else{
        let comment=new Comment(req.body);
        comment.save((err,result)=>{
            if(err){
                console.log("Error while adding comment",err);
                next({code:500,msg:"Unable to post comment"})
            }else{
                res.status(200).json({msg:"Comment Posted Successfully!!!"})
            }
        });
    }
}

module.exports={
    userController,
    commentController
};