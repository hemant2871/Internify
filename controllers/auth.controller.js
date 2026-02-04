const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req,res)=>{
  const hashed = await bcrypt.hash(req.body.password,10);
  const user = await User.create({...req.body,password:hashed});
  res.json(user);
};

exports.login = async (req,res)=>{
  const user = await User.findOne({email:req.body.email});
  const match = await bcrypt.compare(req.body.password,user.password);
  const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
  res.json({token,user});
};
