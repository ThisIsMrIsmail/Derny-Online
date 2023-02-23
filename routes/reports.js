const express = require("express");
const path = require("path");
const pool = require(path.join(__dirname, "/../db.js"));
///////////////////////////////////////////////////////////

const router = express.Router();
///////////////////////////////////////////////////////////

router.get("/reports", async (req, res) => {
  res.render("payroll",{
    field: "Reports"
  });
})

module.exports = router;