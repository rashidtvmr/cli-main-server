const _=require("lodash")
const User=require('../model/User');
// Create User
let userController={};
userController.createUser=(req,res,next)=>{
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
        next("Unable to create user");
    });
}

userController.loginUser=(req,res,next)=>{
    let body=req.body;
    User.findOne({username:body.username}).then(existingUser=>{
        if(!existingUser)
            next("Invalid username");
        else{
            existingUser.comparePassword(body.password,(err,isMatch)=>{
                if(!isMatch){
                    next("Invalid password")
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
        next("Unauthorized Access");
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
                next("Invalid user id");
            }
        }).catch(err=>{
            console.log("Error while getting single user:",err)
            next("Unable to get single user")
        });
}

userController.updateUser=(req,res,next)=>{
    if(_.isUndefined(req.user.id))
        next("Unauthorized Access");
    else{
        const id = req.user.id;
        const body = req.body;
        return User.findById(id, (err, user) => {
          if (err) {
            console.log("DB error.user.update", err);
            return next("Unable to update");
          }
          if (!user) {
            return next("Invalid user id");
          }
          user.username = body.name || user.name;
          user.email = body.email || user.email;
          return user.save((err, result) => {
            if (err) {
              if (err.code === 11000) {
                return next("Email already exist");
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

userController.deleteUser=(req,res,next)=>{
    if(_.isUndefined(req.user.id))
        next("Unauthorized Access");
    else{
        User.findOneAndDelete({id:req.user.id}).then(deletedUser=>{
            res.status(200).json({msg:"User deleted successfully",status:200})
        }).catch(err=>{
            console.log("Error while deleting user:",err);
            next("User will not be deleted");
        });   
    }
}

module.exports={
    userController
}