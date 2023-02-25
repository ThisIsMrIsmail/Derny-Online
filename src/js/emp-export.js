
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
document.querySelector("#form-current-day").innerHTML = d.toLocaleDateString("en-SA");
document.querySelector("#form-current-time").innerHTML = d.toLocaleTimeString("en", {
  hour: "2-digit",
  minute: "2-digit"
});
document.querySelector("#en-date").textContent = d.toLocaleDateString("en", options);
document.querySelector("#ar-date").textContent = d.toLocaleDateString("ar", options);

JsBarcode("#barcode-canvas", $("#barcode").val());

let dateOfJoining = moment( $("#empDateOfJoining").val() ).format("YYYY-MM-DD");  // changing date format to meet moment formats
let todayDate = moment().format("YYYY-MM-DD");  // changing Today's date format to meet moment formats

let diff = moment.preciseDiff(dateOfJoining, todayDate, true); // 'x year x month x days x hours x minutes x seconds'

$(".yearsOfService").text( diff.years );
$(".rmMonthsOfService").text( diff.months );
$(".rmDaysOfService").text( diff.days );

///////////////////////////////////////////////////////////
window.jsPDF = window.jspdf.jsPDF;

function PrintPreviewPDF () {
  $("#pdf-buttons").css("display", "none");
  $("hr").css("display", "none");
  window.print();
  $("#pdf-buttons").css("display", "flex");
  $("hr").css("display", "block");
}

function PrintPreviewForm () {
  $("#pdf-buttons").css("display", "none");
  $("hr").css("display", "none");
  $("#content").css("display", "none");
  $("#form-content").css("display", "block");
  window.print();
  $("#pdf-buttons").css("display", "flex");
  $("hr").css("display", "block");
  $("#content").css("display", "block");
  $("#form-content").css("display", "none");
}


// saving Emp info form as pdf
function savePDF () {
  let emp_id = $("#emp_id").val();
  let content = document.getElementById("content");
  html2canvas(content, {
    scale: 3
  })
  .then((content) => {
    let base64image = content.toDataURL("image/jpeg");
    const doc = new jsPDF('p', 'px', 'a4');
    doc.addImage(base64image, 'jpeg', 10, 8, 426, 605)
    doc.save(emp_id + ".pdf")
  })
}

function saveFormPDF () {
  let content = document.getElementById("form-content");
  content.style.display = "block";
  html2canvas(content, {
    scale: 3
  })
  .then((content) => {
    let base64image = content.toDataURL("image/jpeg");
    const doc = new jsPDF('p', 'px', 'a4');
    doc.addImage(base64image, 'jpeg', 10, 8, 426, 605)
    doc.save("Employee_Form.pdf")
  })
  content.style.display = "none";
}