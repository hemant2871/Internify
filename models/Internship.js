const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  title:String,
  company:String,
  domain:String,
  skills:[String],
  stipend:Number,
  description:String,
  postedAt:{type:Date,default:Date.now}
});

module.exports = mongoose.model("Internship",internshipSchema);
