const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");
const pool = require(path.join(__dirname, "/../db.js"));
const world = require(path.join(__dirname, "/../world.js"));
///////////////////////////////////////////////////////////

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
///////////////////////////////////////////////////////////



// ========================================
// GET route
// ========================================
router.get("/employees/:getEmp", async (req, res) => {
  try {
    let getEmp = req.params.getEmp;

    let record = await pool.query(`SELECT emp_id FROM employees WHERE emp_id = ?`, [getEmp]);
    
    if (record[0][0]?.emp_id) {
      let statement = `
      SELECT * FROM employees e JOIN current_info ci
        ON e.emp_id = ci.emp_id JOIN home_info hi
        ON e.emp_id = hi.emp_id JOIN companys co
        ON e.emp_id = co.emp_id JOIN departments dep
        ON e.emp_id = dep.emp_id
      WHERE e.emp_id = ?`;
      // Getting Employee info
      let records = await pool.query(statement, [getEmp])
      records = records[0][0];
      if (records) {
        const countries = world.countries();
        const states = world.states();
        res.render("emp-info", {
          emp: records,
          countries: countries,
          states: states,
          dateOfJoining: records.date_of_joining.toLocaleDateString("en-SA", {
            day: "numeric",
            month: "short",
            year: "numeric"
          })
        });
        console.log("* Emp info : " +records.emp_id+ " / " +records.full_name_en);
      } else {
        res.send("<p>Error with getting Emp Info</p> <a href='/employees'>Employees</a>");
      }
    } else {
      res.send("<p>Employee not found . . .</p> <a href='/employees'>Employees</a>");
    }

  } catch (error) {
    console.log(error);
  }
});



// ========================================
// POST route
// ========================================
router.post("/employees/:getEmp", async (req, res) => {
  // Checking Validity of UNIQUE values entered to the system.
  const checkUniqueValues = async (records) => {
    try {
      let error1, error3, error2=0;
      records.forEach(emp => { if (emp.identity_id === req.body.identityId) { error1=1; } });
      records.forEach(emp => { if (emp.passport_id === req.body.passportId) { error2=1; } });
      records.forEach(emp => { if (emp.email === req.body.email) { error3=1; } });
      if (error1==1 || error2==1 || error3==1) {
        error1, error2, error3 = 0;
        console.log("- Validity (FALSE)"); return false;
      } else { 
        console.log("- Validity (TRUE)"); return true;
      }
    } catch (error) {
      console.log(error);
      res.send("Error with checking unique validity  . . .");
    }
  }
  // Updating data input
  const updateData = async () => {
    try {
      let emp_id = req.params.getEmp;
      // employees table input
      const employeesDATA = {
        full_name_en: req.body.fullName,
        // full_name_ar: req.body.fullNameAR,
        email: req.body.email,
        identity_id: req.body.identityId,
        passport_id: req.body.passportId,
        nationality: req.body.nationality,
        emp_status: req.body.status
      } // current info table input
      const current_infoDATA = {
        current_country:req.body.currentCountry,
        current_state:req.body.currentState,
        current_address:req.body.currentAddress,
        current_phone_1:req.body.currentPhone1,
        current_phone_2:req.body.currentPhone2
      } // home info table input
      const home_infoDATA = {
        home_country:req.body.homeCountry,
        home_state:req.body.homeState,
        home_address:req.body.homeAddress,
        home_phone:req.body.homePhone,
        relative_phone:req.body.relativePhone
      } // companys table input
      const companysDATA = {
        company_name:req.body.companyName,
        branch:req.body.branch
      } // departments table input
      const departmentsDATA = {
        position:req.body.position,
        department:req.body.department
      }

      await pool.query(`UPDATE employees SET ? WHERE emp_id = ?`, [employeesDATA, emp_id]);
      await pool.query(`UPDATE current_info SET ? WHERE emp_id = ?`, [current_infoDATA, emp_id]);
      await pool.query(`UPDATE home_info SET ? WHERE emp_id = ?`, [home_infoDATA, emp_id]);
      await pool.query(`UPDATE companys SET ? WHERE emp_id = ?`, [companysDATA, emp_id]);
      await pool.query(`UPDATE departments SET ? WHERE emp_id = ?`, [departmentsDATA, emp_id]);
      res.redirect("/employees/" +emp_id);
    } catch (err) {
      console.log(err);
      res.send("Error with updating data to the database . . .");
    }
  }
  // Updating input file ex: image, Iqama/Id, ...
  const updateFiles = async () => {
    try {
      const emp_id = req.params.getEmp;
      const updateFile = async (file, fileName, name) => {
        const folderPath = path.join(__dirname, "/../src", "uploads", "emp-attached-files", emp_id);
        if (file) {
          file.mv(path.join(folderPath, fileName));
          console.log(" (" +name+ ") UPLOADED");
        } else {
          console.log(" (" +name+ ") no file to upload . . .");
        }
      }
      // moveing files to the employee's folder
      if (req.files) {
        if (req.files?.personalImage)
          updateFile(req.files.personalImage, ("personal_image_" +emp_id+ ".jpg"), "personalImage");
        if (req.files?.IqamaId)
          updateFile(req.files.IqamaId, ("iqama_id_" +emp_id+ ".pdf"), "IqamaId");
        if (req.files?.passport)
          updateFile(req.files.passport, ("passport_" +emp_id+ ".pdf"), "passport");
        if (req.files?.socialInsurance)
          updateFile(req.files.socialInsurance, ("social_insurance_" +emp_id+ ".pdf"), "socialInsurance");
        if (req.files?.certificates)
          updateFile(req.files.certificates, ("certificates_" +emp_id+ ".pdf"), "certificates");
        if (req.files?.drivingLicense)
          updateFile(req.files.drivingLicense, ("driving_license_" +emp_id+ ".pdf"), "drivingLicense");
        if (req.files?.others)
          updateFile(req.files.others, ("others_" +emp_id+ ".pdf"), "others");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // MAIN
  ( async () => {
    try {
      let records = await pool.query({
        sql: `SELECT identity_id, passport_id, email
        FROM employees
        WHERE email != ? and identity_id != ? and passport_id != ? `,
        values: [req.body.oldEmail, req.body.oldIdentityId, req.body.oldPassportId]
      });
      console.log("===================================================");
      let validity = await checkUniqueValues(records[0]);
      if (validity) {
        await updateData();
        await updateFiles();
        console.log("=======================");
        console.log("✅ Main UPDATE is DONE");
        console.log("===================================================");
      } else {
        res.render("submition-error");
      }
    } catch (error) {
      console.log(error);
      res.send("Error inside MAIN function . . .");
    }  
  })();

});

module.exports = router;