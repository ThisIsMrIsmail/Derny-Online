
// Page loader 
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  loader.classList.add("loader-hidden");
  loader.addEventListener("transitionend", function () {
    $(".loader").remove();
  })
})