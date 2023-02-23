
const togglePassword1 = document.querySelector('#togglePassword1');
const togglePassword2 = document.querySelector('#togglePassword2');

const password1 = document.querySelector('#floatingPassword1');
const password2 = document.querySelector('#floatingPassword2');

// Password
togglePassword1.addEventListener('click', function (e) {
  // toggle the type attribute
  const type1 = password1.getAttribute('type') === 'password' ? 'text' : 'password';
  password1.setAttribute('type', type1);
  // toggle the eye slash icon
  this.classList.toggle('fa-eye-slash');
});

// Confirm Password
togglePassword2.addEventListener('click', function (e) {
  // toggle the type attribute
  const type2 = password2.getAttribute('type') === 'password' ? 'text' : 'password';
  password2.setAttribute('type', type2);
  // toggle the eye slash icon
  this.classList.toggle('fa-eye-slash');
});


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

      // Ismail created this code below and I am happy with it
      var pass1 = document.getElementById("floatingPassword1").value
      var pass2 = document.getElementById("floatingPassword2").value

      if (pass1!=pass2 && pass1!="" && pass2!="") {
        $(".passwordMatching").css("display", "block")
        $(".passwordMatching").addClass('invalid-feedback')

        document.getElementById("floatingPassword1").setCustomValidity("Passwords are not matching.")
        document.getElementById("floatingPassword2").setCustomValidity("Passwords are not matching.")

        $("#p1").css("display", "none")
        $("#p2").css("display", "none")

        event.preventDefault()
        event.stopPropagation()
      }
      // end ismail's code


      form.classList.add('was-validated')
    }, false)
  })
})()

