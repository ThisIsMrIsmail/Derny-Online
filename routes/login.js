const express = require("express");
const path = require("path");
const pool = require(path.join(__dirname, "/../db.js"));
///////////////////////////////////////////////////////////

const router = express.Router();
///////////////////////////////////////////////////////////

router.get("/login", (req, res) => {
  res.render("login");
})
// router.post("/login", function (req, res) {
//   //request input data and compare it with sql users data
// })

module.exports = router;