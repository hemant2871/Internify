const Application = require("../models/Application");

exports.apply = async (req,res)=>{
  const app = await Application.create({
    user:req.userId,
    internship:req.body.internshipId,
    message:req.body.message
  });
  res.json(app);
};
