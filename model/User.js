const mongoose=require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv/config");

let userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
    },
    email:{
        type:String,
        unique:true
    },
    password:String
});

userSchema.pre("save", function save(next) {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
});

userSchema.methods.comparePassword = function comparePassword(
    candidatePassword,
    cb
  ) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      cb(err, isMatch);
    });
  };
  
userSchema.methods.generateAuthToken = function() {
    let token = jwt.sign(
      {
        _id: this._id,
        email: this.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3 days"
      }
    );
    return token;
  };
  
module.exports=mongoose.model("users",userSchema);