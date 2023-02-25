const express = require("express");
const bodyParser = require("body-parser")
const fs = require("fs")
const path = require("path");
const moment = require("moment")
const pool = require(path.join(__dirname, "/../db.js"));
// const translate = require("translate")
///////////////////////////////////////////////////////////

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
///////////////////////////////////////////////////////////



router.get("/employees/:getEmp/:exportType", async (req, res) => {
  try {
    let getEmp = req.params.getEmp;

    let record = await pool.query(`SELECT emp_id FROM employees WHERE emp_id = ?`, [getEmp]);

    if (record[0][0]?.emp_id) {
      switch (req.params.exportType) {
        case "export-pdf":
        
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
          
          const d = new Date();

          // Generating barcode
          let identityId = records.identity_id;
          let empId = records.emp_id;
          let todayDate = d.toLocaleDateString("en-SA", { day: "numeric", month: "numeric", year: "numeric" });
          todayDate = todayDate.replace("/", "");
          todayDate = todayDate.replace("/", "");
          if (todayDate.length < 8)
            todayDate = "0" + todayDate;
          let barcode = todayDate + identityId + empId;

          // Date options
          const options = {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric"
          };

          // Attached Files checking
          const emp_id = records.emp_id.toString()
          const Folder = path.join(__dirname, "/../src", "uploads", "emp-files", emp_id);
          const files = fs.readdirSync(Folder)
          console.log(files);

          function checkFiles (filename) {
            let bool;
            for (let i=0; i<files.length; i++) {
              let StoredFileName = files[i].substring(0, files[i].length - 4);
              if (filename == StoredFileName) {
                bool = "true";
              }
            }
            if (!bool)
              bool = "false";
            return bool;
          }

          res.render("emp-export", {
            emp: records,
            barcode: barcode,
            dateOfJoiningEN: await records.date_of_joining.toLocaleDateString("en", options),
            dateOfJoiningAR: await records.date_of_joining.toLocaleDateString("ar", options),
            // getting files availability
            personalImage: checkFiles("personal_image_" + emp_id),
            IqamaId: checkFiles("iqama_id_" + emp_id),
            passport: checkFiles("passport_" + emp_id),
            contract: checkFiles("contract_" + emp_id),
            socialInsurance: checkFiles("social_insurance_" + emp_id),
          });
        } else {
          res.send("<p>Error with getting Emp Info</p> <a href='/employees'>Employees</a>");
        }
        break;
        
        default:
          res.send("Wrong Export Type . . .")
          break;
      }
    }
    else {
      res.send("<p>Employee not found . . .</p> <a href='/employees'>Employees</a>");
    }

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;



// to be used later

// // using translate
// translate.engine = "google"; // Or "yandex", "libre", "deepl"
// translate.key = process.env.GOOGLE_KEY;

// const translateToArabic = (text) => {
//   translate(text, { to: "ar" });
//   console.log(text);
// }
// const empAR = {
//   companyName: translateToArabic(emp.company_name),
//   nationality: translateToArabic(emp.nationality),
//   position: translateToArabic(emp.position),
//   department: translateToArabic(emp.department),
//   branch: translateToArabic(emp.branch),
//   currentCountry: translateToArabic(emp.current_country),
//   currentState: translateToArabic(emp.current_state),
//   currentAddress: translateToArabic(emp.current_address),
//   homeCountry: translateToArabic(emp.home_country),
//   homeState: translateToArabic(emp.home_state),
//   homeAddress: translateToArabic(emp.home_address)
// }