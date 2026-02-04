const Internship = require("../models/Internship");
const Application = require("../models/Application");

exports.addInternship = async (req,res)=>{
  res.json(await Internship.create(req.body));
};

exports.getApplications = async (req,res)=>{
  const data = await Application.find()
    .populate("user")
    .populate("internship");
  res.json(data);
};
