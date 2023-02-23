const express = require("express");
const path = require("path");
const pool = require(path.join(__dirname, "/../db.js"));
///////////////////////////////////////////////////////////

const router = express.Router();
///////////////////////////////////////////////////////////

router.get("/signup", (req, res) => {
  res.render("signup");
})
router.post("/signup", function (req, res) {
  res.redirect("/login");
})

module.exports = router;