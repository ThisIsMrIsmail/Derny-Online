const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const pool = require(path.join(__dirname, "/db.js"));
///////////////////////////////////////////////////////////

const app = express();
const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("src"));
///////////////////////////////////////////////////////////

// Routes
const home = require("./routes/home")
const signup = require("./routes/signup")
const login = require("./routes/login")
const dashboard = require("./routes/dashboard")
const employees = require("./routes/employees")
const newEmployee = require("./routes/new-employee")
const empInfo = require("./routes/emp-info")
const empExport = require("./routes/emp-export")
const payroll = require("./routes/payroll")
const reports = require("./routes/reports")

app.use("/", home)
app.use("/", signup)
app.use("/", login)
app.use("/", dashboard)
app.use("/", employees)
app.use("/", empExport)
app.use("/", newEmployee)
app.use("/", empInfo)
app.use("/", payroll)
app.use("/", reports)


// listen on eviroment port || 8080
app.listen(port, () => {
  if (port === 8080)
    console.log(`🚀 server is running: http://localhost:${port}/`);
  else 
    console.log(`🚀 server is running on port: ${port}`);
  console.log("------------------------------------------------");
});