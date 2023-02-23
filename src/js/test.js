// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }      
      form.classList.add('was-validated')
    }, false)
  })
})()

// max size: 2 MB
// change this is you want to increase or decrease max file size could be uploaded
const maxFileSize = 2; 
const checkFileSize = (e, id) => {
  var fileSize = (e.currentTarget.files[0].size/1024/1024);   // in MB
  fileSize = Math.round(fileSize * 100) / 100;  // rounding to nearest 100
  if (fileSize > maxFileSize) {
    alert("File size (" +fileSize+ "MB) is greater than " +maxFileSize+ "MB, please choose another file." );
    $(id).val(null);
  }
}
// checking image file size
$("#personalImage").change( (e) => { checkFileSize(e, "#personalImage"); });
// checking image file size
$("#IqamaId").change( (e) => { checkFileSize(e, "#IqamaId"); });
// checking image file size
$("#passport").change( (e) => { checkFileSize(e, "#passport"); });
// checking image file size
$("#socialInsurance").change( (e) => { checkFileSize(e, "#socialInsurance"); });
