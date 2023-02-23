
//  feather:false
(() => {
  'use strict'
  feather.replace({ 'aria-hidden': 'true' })
})()

$('button[data-bs-target="#employees-collapse"]').attr("aria-expanded", true);
setTimeout(()=> {
  $("#employees-collapse").addClass("show");
  $("#employees-collapse #overview-sidebar").css("background-color", "#d2f4ea");
}, 200)