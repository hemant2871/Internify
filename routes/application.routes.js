const r = require("express").Router();
const auth = require("../middleware/auth.middleware");
const c = require("../controllers/application.controller");
r.post("/",auth,c.apply);
module.exports = r;
