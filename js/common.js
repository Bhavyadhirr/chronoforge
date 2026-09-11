/*
  Tiny shared helper included on every page: stamps the current year
  into the footer. Nothing else on the page is JS-injected — nav and
  copy live directly in each HTML file so they're easy to hand-edit.
*/
document.querySelectorAll("[data-year]").forEach(function (el) {
  el.textContent = new Date().getFullYear();
});
