
// create shortcut for focusing on the search bar to type something
$(document).keydown(function (e) {
  if(e.which == 191) {
    setTimeout(function() {
      document.querySelector("#searchBar").focus();
    }, 10);
  }
  if(e.which == 27) {
    setTimeout(function() {
      document.querySelector("#searchBar").blur();
    }, 10);
  }
});

// Searching for employee using emp id.
$("#searchBar").on("change", () => {
  // search value
  let searchValue = $("#searchBar").val();
  // changing browser route
  window.location.href = "/employees/" +searchValue+ "/";  
});

// This code is a JavaScript function that uses the Bootstrap library
// to create tooltips for elements with the attribute 'data-bs-toggle="tooltip"'.
// It first creates an array of all elements with this attribute, then loops
//  through each element and creates a new Bootstrap Tooltip for each one.

( () => {
  'use strict'
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()
