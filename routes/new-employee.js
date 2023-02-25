const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require('fs');
const pool = require(path.join(__dirname, "/../db.js"));
const world = require(path.join(__dirname, "/../world.js"));
///////////////////////////////////////////////////////////

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());
router.use(fileUpload({  // using fileUpload package to save files
  useTempFiles: true,  // activing temp so the memory is keept clean
  tempFileDir: path.join(__dirname, "/../tmp"),  // path of the temp dir
  createParentPath: true  // creating parent dir dynamically if it doesn't exist
}));
///////////////////////////////////////////////////////////

router.get("/new-employee", async (req, res) => {
  const countries = await world.countries();
  const states = await world.states();
  res.render("new-employee", {
    countries: countries,
    states: states
  });
})

router.post("/new-employee", async (req, res) => {
  // Getting emp id
  const getEmpId = (record) => {
    try {
      let emp_id;
      if (record)
        emp_id = record + 1;
      else
        emp_id = 1001;
      console.log("- getEmpId DONE");
      console.log("Current Emp Id: " +emp_id);
      return emp_id;
    } catch (error) {
      res.send("Error getting employee id . . .");
      console.log(error);
    }
  }
  
  // Checking Validity of UNIQUE values entered to the system.
  const checkUniqueValues = async (records) => {
    try {
      let error1, error3, error2=0;
      records.forEach(emp => { if (emp.identity_id === req.body.identityId) { error1=1; } });
      records.forEach(emp => { if (emp.passport_id === req.body.passportId) { error2=1; } });
      records.forEach(emp => { if (emp.email === req.body.email) { error3=1; } });
      if (error1==1 || error2==1 || error3==1) {
        error1, error2, error3 = 0;
        console.log("- Validity (FALSE)");
        return false;
      } else { 
        console.log("- Validity (TRUE)");
        return true;
      }
    } catch (error) {
      res.send("Error with checking unique validity  . . .");
      console.log(error);
    }
  }

  // Inserting data input
  const insertData = async (EmpId) => {
    try {
      let emp_id = EmpId;
      console.log("BODY INPUT:-");
      console.log(req.body);
      console.log("===================================================");
      const employeesDATA = {  // employees table input
        emp_id: emp_id,
        full_name_en: req.body.fullNameEN,
        full_name_ar: req.body.fullNameAR,
        date_of_birth: req.body.dateOfBirth,
        date_of_joining: req.body.dateOfJoining,
        email: req.body.email,
        gender: req.body.gender,
        contract: req.body.contract,
        identity_id: req.body.identityId,
        passport_id: req.body.passportId,
        nationality: req.body.nationality,
        emp_status: 1
      }
      const current_infoDATA = {  // current info table input
        current_country:req.body.currentCountry,
        current_state:req.body.currentState,
        current_address:req.body.currentAddress,
        current_country_phone_code:req.body.currentCountryPhoneCode,
        current_phone_1:req.body.currentPhone1,
        current_phone_2:req.body.currentPhone2,
        emp_id:emp_id
      }
      const home_infoDATA = {  // home info table input
        home_country:req.body.homeCountry,
        home_state:req.body.homeState,
        home_address:req.body.homeAddress,
        home_country_phone_code:req.body.homeCountryPhoneCode,
        home_phone:req.body.homePhone,
        relative_phone:req.body.relativePhone,
        emp_id:emp_id
      }
      const companysDATA = {  // companys table input
        company_name:req.body.companyName,
        branch:req.body.branch,
        emp_id:emp_id
      }
      const departmentsDATA = {  // departments table input
        position:req.body.position,
        department:req.body.department,
        emp_id:emp_id
      }

      await pool.query(`INSERT INTO employees SET ?`, employeesDATA);
      console.log("- (employees) DONE");
      console.log("---------------------");
      await pool.query(`INSERT INTO current_info SET ?`, current_infoDATA);
      console.log("- (current info) DONE");
      console.log("---------------------");
      await pool.query(`INSERT INTO home_info SET ?`, home_infoDATA);
      console.log("- (home info) DONE");
      console.log("---------------------");
      await pool.query(`INSERT INTO companys SET ?`, companysDATA);
      console.log("- (companys) DONE");
      console.log("---------------------");
      await pool.query(`INSERT INTO departments SET ?`, departmentsDATA);
      console.log("- (departments) DONE");
      console.log("---------------------");

    } catch (err) {
      res.send("Error with inserting data to the database . . .");
      console.log(err);
    }
  }
  
  // Saving input file ex: image, Iqama/Id, ...
  const saveFiles = async (EmpId) => {
    try {
      let emp_id = EmpId.toString();
      // creating folder for the employee
      const folderPath = path.join(__dirname, "/../src", "uploads", "emp-files", emp_id);
      try { if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath); }
      catch (err) { console.error(err); }
      // save file function
      const saveFile = (file, fileName, name) => {
        if (file) {
          file.mv(path.join(folderPath, fileName));
          console.log(" (" +name+ ") UPLOADED");
        } else {
          console.log(" (" +name+ ") no file to SAVE . . .");
        }
      }
      // moveing files to the employee's folder
      if (req.files) {
        if (req.files?.personalImage)
          saveFile(req.files.personalImage, ("personal_image_" +emp_id+ ".jpg"), "personalImage");
        if (req.files?.IqamaId)
          saveFile(req.files.IqamaId, ("iqama_id_" +emp_id+ ".pdf"), "IqamaId");
        if (req.files?.passport)
          saveFile(req.files.passport, ("passport_" +emp_id+ ".pdf"), "passport");
        if (req.files?.socialInsurance)
          saveFile(req.files.socialInsurance, ("social_insurance_" +emp_id+ ".pdf"), "socialInsurance");
        if (req.files?.certificates)
          saveFile(req.files.certificates, ("certificates_" +emp_id+ ".pdf"), "certificates");
        if (req.files?.drivingLicense)
          saveFile(req.files.drivingLicense, ("driving_license_" +emp_id+ ".pdf"), "drivingLicense");
        if (req.files?.others)
          saveFile(req.files.others, ("others_" +emp_id+ ".pdf"), "others");
      }

      console.log("- saveFiles DONE");
    } catch (error) {
      console.log(error);
      res.send("Error with uploading files . . .");
    }
  }

  // MAIN
  ( async () => {
    try {
      let record = await pool.execute('SELECT MAX(emp_id) as emp_id FROM employees');
      let records = await pool.query('SELECT identity_id, passport_id, email FROM employees');

      console.log("===================================================");
      let emp_id = await getEmpId(record[0][0].emp_id);
      let validity = await checkUniqueValues(records[0]);
      if (validity) {
        await insertData(emp_id);
        await saveFiles(emp_id);
        console.log("=======================");
        console.log("✅ Main INSERT is DONE");
        console.log("===================================================");
        res.redirect("/employees");
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