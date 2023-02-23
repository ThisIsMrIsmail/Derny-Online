
const d = new Date();  // Today's date

const options = {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric"
}
document.querySelector("#current-day").innerHTML = d.toLocaleDateString("en-SA");
document.querySelector("#current-time").innerHTML = d.toLocaleTimeString("en", {
  hour: "2-digit",
  minute: "2-digit"
});
document.querySelector("#en-date").innerHTML = d.toLocaleDateString("en", options);
document.querySelector("#ar-date").innerHTML = d.toLocaleDateString("ar", options);

JsBarcode("#barcode-canvas", $("#barcode").val());

let dateOfJoining = moment( $("#empDateOfJoining").val() ).format("YYYY-MM-DD");  // changing date format to meet moment formats
let todayDate = moment().format("YYYY-MM-DD");  // changing Today's date format to meet moment formats

let diff = moment.preciseDiff(dateOfJoining, todayDate, true); // 'x year x month x days x hours x minutes x seconds'

$(".yearsOfService").text( diff.years );
$(".rmMonthsOfService").text( diff.months );
$(".rmDaysOfService").text( diff.days );


window.jsPDF = window.jspdf.jsPDF;

let page = document.getElementById("content");
let filename = $("#emp_id").val();

function generatePDF_Letter () {
  html2canvas(page, {
    scale: 2.4  
  })
  .then((content) => {
    let base64image = content.toDataURL("image/jpeg");
    const doc = new jsPDF('p', 'px', 'letter', [460, 600]);
    doc.addImage(base64image, 'jpeg', 9.5, 10, 440, 560)
    doc.save(filename + "-letter" + ".pdf")
  })
}

function generatePDF_A4 () {
  html2canvas(page, {
    scale: 3
  })
  .then((content) => {
    let base64image = content.toDataURL("image/jpeg");
    const doc = new jsPDF('p', 'px', 'a4');
    doc.addImage(base64image, 'jpeg', 10, 8, 426, 605)
    doc.save(filename + "-A4" + ".pdf")
  })
}

function generatePDF_HighFidelity () {
  html2canvas(page, {
    scale: 3
  })
  .then((content) => {
    let base64image = content.toDataURL("image/jpeg");
    const doc = new jsPDF('p', 'px', [1249, 1980]);
    doc.addImage(base64image, 'jpeg', 35, 40, 1179, 1900)
    doc.save(filename + "-high fidelity" + ".pdf")
  })
}

