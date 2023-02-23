const express = require("express");
const path = require("path");
const pool = require(path.join(__dirname, "/../db.js"));
///////////////////////////////////////////////////////////

const router = express.Router();
///////////////////////////////////////////////////////////

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
})

module.exports = router;