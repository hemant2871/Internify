const r = require("express").Router();
const c = require("../controllers/internship.controller");
r.get("/",c.getAll);
module.exports = r;
