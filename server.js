const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/internships", require("./routes/internship.routes"));
app.use("/api/apply", require("./routes/application.routes"));
app.use("/api/admin", require("./routes/admin.routes"));

app.get("/", (req,res)=>{
  res.send("Internify Backend Running 🚀");
});

app.listen(process.env.PORT, ()=>{
  console.log("Server running on port 5000");
});

