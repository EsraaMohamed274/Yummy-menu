/* app.js */
const apiBase = "https://www.themealdb.com/api/json/v1/1";
const mealsContainer = document.getElementById("mealsContainer");
const mealDetails = document.getElementById("mealDetails");
const controls = document.getElementById("controls");
const sideNav = document.getElementById("sideNav");
const toggleNavBtn = document.getElementById("toggleNav");
const menuList = document.getElementById("menuList");


let currentView = ""; // search / categories / area / ingredients / contact

// Toggle side nav animation (adds class to nav to trigger CSS)
toggleNavBtn.addEventListener("click", () => {
  menuList.classList.replace("d-none", "d-block"); // ensure menu is visible to animate
  //also show menu-link animations by toggling class at root
  if (menuList.classList.contains("d-block")) {
    menuList.classList.replace("d-block", "d-none");
  } else {
    menuList.classList.replace("d-none", "d-block");
  }
});

