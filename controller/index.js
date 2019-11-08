const _=require("lodash")
const User=require('../model/User');
const { validationResult } = require('express-validator')
// Create User
let userController={};

//409 for data duplicaition
userController.createUser=(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log("Validation error:",errors.errors)
        next({code:409,msg:errors.errors[0].msg});
    }else{
        let body=req.body
        console.log("request body",body);
        let user=new User(body);
        user.save().then(userSaved=>{
            console.log("Saved user response");
            let response={
                status:"success",
                msg:"User created successfully",
                token:userSaved.generateAuthToken()
            }
            res.status(200).json(response);
        }).catch(unsavedUser=>{
            console.log("Error while creating user:",unsavedUser);
            if(unsavedUser.code === 11000){
                next({code:409,msg:"username or email already exist:"+unsavedUser.errmsg});
            }else{
                next({code:400,msg:"Unable to create user"});
            }
        });
    }
}

userController.loginUser=(req,res,next)=>{
    let body=req.body;
    User.findOne({username:body.username}).then(existingUser=>{
        if(!existingUser)
            next({code:400,msg:"Invalid username"});
        else{
            existingUser.comparePassword(body.password,(err,isMatch)=>{
                if(!isMatch){
                    next({code:400,msg:"Invalid password"});
                }else{
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
        next("Unable to logged in user");
    });
}

userController.getSingleUser=(req,res,next)=>{
    if(_.isUndefined(req.user.id))
        next({code:401,msg:"Unauthorized Access"});
    else
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

userController.updateUser=(req,res,next)=>{
    console.log('Update User.....')
    if(_.isUndefined(req.user.id))
        next({code:401,msg:"Unauthorized Access"});
    else{
        let errors=validationResult(req);
        
        if(!errors.isEmpty()){
            console.log("Validation Error",errors.errors);
            next({code:409,msg:errors.errors})
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
            user.username = body.username || user.username;
            user.email = body.email || user.email;
            return user.save((err, result) => {
                if (err) {
                if (err.code === 11000) {
                    next({code:409,msg:"username or email already exist:"+err.errmsg});
                }
                return console.log(err);
                }
                let response = { ...result._doc };
                response.status = 200;
                response.msg = "Successfully updated user";
                return res.status(200).json(response);
            });
            });
        
        }

        
    }
}

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

module.exports={
    userController
}