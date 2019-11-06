
require("dotenv/config");
const _=require('lodash');
const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    //if (req.user === undefined) return res.status(404).send({ msg: "User not loggedin" });
  if (_.isUndefined(req.header("Authorization"))) {
    
    const token = req.query.access_token;
    console.log(token)
    if (!token)
        return res.status(401).send("Access denied.No Authorization token");
    
    try {
      const valid = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {};
      req.user.id = valid._id;
      req.user.email = valid.email;
      next();
    } catch (ex) {
      res.status(400).send("Invalid Access token");
    }
  } else {
    const token = req.header("Authorization").split(" ")[1];
    console.log("2.",req.header("Authorization"));
    if (!token)
      return res.status(401).send("Access denied.No Authorization token");
    try {
      const valid = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Parsed JWT:",token)
      req.user = {};
      req.user.id = valid._id;
      req.user.email = valid.email;
      next();
    } catch (ex) {
      console.log(ex);
      res.status(400).send("Invalid Access token");
    }
  }

};