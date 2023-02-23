const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const pool = require(path.join(__dirname, "/../db.js"));
///////////////////////////////////////////////////////////

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
///////////////////////////////////////////////////////////

router.get("/employees", async (req, res) => {
  let records = await pool.query(`
  SELECT * FROM employees e JOIN companys co
    ON e.emp_id = co.emp_id`);
  res.render("employees", { records: records[0] });
  console.log("number of records (employees): " +records[0].length);
});


router.post("/employees", async (req, res) => {
  
  let getEmpSearch = req.body.searchBar;;

  // selector: identity_id
  if (getEmpSearch.length > 4) {
    let record = await pool.query(`SELECT emp_id FROM employees WHERE identity_id = ?`, [getEmpSearch]);
    if (record[0][0]?.emp_id) {
      res.redirect("/employees/" + (record[0][0].emp_id));
    } else {
      res.send("<p>Employee not found . . .</p> <a href='/employees'>Employees</a>");
    }
  }
  
  // selector: emp_id
  else if (getEmpSearch.length == 4) {
    let record = await pool.query(`SELECT emp_id FROM employees WHERE emp_id = ?`, [getEmpSearch]);
    if (record[0][0]?.emp_id) {
      res.redirect("/employees/" + (record[0][0].emp_id));
    } else {
      res.send("<p>Employee not found . . .</p> <a href='/employees'>Employees</a>");
    }
  }
  
});

module.exports = router;