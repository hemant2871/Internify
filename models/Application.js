const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  user:{ type:mongoose.Schema.Types.ObjectId, ref:"User"},
  internship:{ type:mongoose.Schema.Types.ObjectId, ref:"Internship"},
  message:String,
  status:{ type:String, default:"Pending"}
});

module.exports = mongoose.model("Application",applicationSchema);
