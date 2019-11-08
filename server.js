
// To get environment variables
require("dotenv/config");

// Express setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// making app global variable
app = express();

// app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public/spa"));

// database setup
const mongoose = require("mongoose");
mongoose.connect(process.env.ATLAS_URL, { useNewUrlParser: true });

// route handling
const { userRoute, commentRoute, nonUserCmntRoute } = require("./routes/index");

app.use("/api/v1/user", userRoute);
app.use("/api/v1/cmt", commentRoute);
app.use("/api/v1/nu/cmt", nonUserCmntRoute);


/**To handle error passed using next({code:errorCode,msg:"Error Message"}) */
app.use((err,req,res,next)=>{
  let statusCode=500 || err.code; //if there is no err.code 500 will be used
  res.status(statusCode).json({msg:err.msg});
})

// Creating server to listen
let port = process.env.PORT || 4938;
app.listen(port, () => {
  console.log("app is running at ", port);
});
