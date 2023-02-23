const express = require("express");
const path = require("path");
const pool = require(path.join(__dirname, "/../db.js"));
///////////////////////////////////////////////////////////

const router = express.Router();
///////////////////////////////////////////////////////////

router.get("/payroll", async (req, res) => {
  res.render("payroll",{
    field: "Payroll"
  });
})

module.exports = router;