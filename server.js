
// To fetch environment variables
require("dotenv/config");

// Express setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
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

app.use((err,req,res,next)=>{
  let statusCode=500 || err.code;
  res.status(err.code).json({msg:err.msg});
})

let port = process.env.PORT || 4938;
app.listen(port, () => {
  console.log("app is running at ", port);
});
