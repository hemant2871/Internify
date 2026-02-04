const Internship = require("../models/Internship");

exports.getAll = async (req,res)=>{
  res.json(await Internship.find());
};

exports.recommend = async (req,res)=>{
  const skills = req.userSkills.split(",").map(s=>s.trim());
  const data = await Internship.find({ skills:{ $in: skills }});
  res.json(data);
};
