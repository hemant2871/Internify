const r = require("express").Router();
const c = require("../controllers/admin.controller");
r.post("/internship",c.addInternship);
r.get("/applications",c.getApplications);
module.exports = r;
