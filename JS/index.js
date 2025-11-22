// const apiBase = "https://www.themealdb.com/api/json/v1/1";
// const mealsContainer = document.getElementById("mealsContainer");
// const mealDetails = document.getElementById("mealDetails");
// const controls = document.getElementById("controls");


// let currentView = ""; // search / categories / area / ingredients / contact


// // open initial section (show some meals on load: use empty name to get default results)
// window.addEventListener("load", () => {
//   openSection("search"); // البداية تظهر "search" controls + default meals
//   fetchMealsByName(""); // show some meals on load per spec
// });

// /* ---------- FETCH HELPERS ---------- */
// async function fetchJSON(url) {
//   const res = await fetch(url);
//   if (!res.ok) throw new Error("Network error");
//   return res.json();
// }

// async function fetchMealsByName(name) {
//   try {
//     const data = await fetchJSON(
//       `${apiBase}/search.php?s=${encodeURIComponent(name)}`
//     );
//     const meals = data.meals || [];
//     renderMeals(meals.slice(0, 20));
//   } catch (err) {
//     console.error(err);
//     renderMeals([]);
//   }
// }

// async function fetchMealsByLetter(letter) {
//   try {
//     const data = await fetchJSON(
//       `${apiBase}/search.php?f=${encodeURIComponent(letter)}`
//     );
//     const meals = data.meals || [];
//     renderMeals(meals.slice(0, 20));
//   } catch (err) {
//     console.error(err);
//     renderMeals([]);
//   }
// }

// async function fetchCategoriesList() {
//   const data = await fetchJSON(`${apiBase}/list.php?c=list`);
//   return data.meals || [];
// }

// async function fetchMealsByCategory(category) {
//   const data = await fetchJSON(
//     `${apiBase}/filter.php?c=${encodeURIComponent(category)}`
//   );
//   const meals = data.meals || [];
//   renderMeals(meals.slice(0, 20));
// }

// async function fetchAreasList() {
//   const data = await fetchJSON(`${apiBase}/list.php?a=list`);
//   return data.meals || [];
// }

// async function fetchMealsByArea(area) {
//   const data = await fetchJSON(
//     `${apiBase}/filter.php?a=${encodeURIComponent(area)}`
//   );
//   const meals = data.meals || [];
//   renderMeals(meals.slice(0, 20));
// }

// async function fetchIngredientsList() {
//   const data = await fetchJSON(`${apiBase}/list.php?i=list`);
//   return data.meals || [];
// }

// async function fetchMealsByIngredient(ing) {
//   const data = await fetchJSON(
//     `${apiBase}/filter.php?i=${encodeURIComponent(ing)}`
//   );
//   const meals = data.meals || [];
//   renderMeals(meals.slice(0, 20));
// }

// async function fetchMealDetailsById(id) {
//   const data = await fetchJSON(
//     `${apiBase}/lookup.php?i=${encodeURIComponent(id)}`
//   );
//   return (data.meals && data.meals[0]) || null;
// }

// /* ---------- RENDERING ---------- */
// function renderMeals(meals) {
//   mealDetails.innerHTML = ""; // hide details
//   mealsContainer.innerHTML = "";
//   if (!meals || meals.length === 0) {
//     mealsContainer.innerHTML = "<p class='text-muted'>No meals found.</p>";
//     return;
//   }

//   meals.forEach((m) => {
//     const col = document.createElement("div");
//     col.className = "col-12 col-md-4 col-lg-3";
//     col.innerHTML = `
    
//       <div class="card meal-card meal overflow-hidden">
//         <img src="${m.strMealThumb}" class="card-img-top" alt="${m.strMeal}">
//         <div class=" card-body p-2 text view-more" data-id="${m.idMeal}">
//           <div class="position-absolute top-50 translate-middle-y">
//   <h3 class="card-title mb-1 mealName">${m.strMeal}</h3>
// </div>

//         </div>
//       </div>
//     `;
//     mealsContainer.appendChild(col);
//   });
// }

// // click handler for view details

// mealsContainer.addEventListener("click", async (e) => {
//   const clicked = e.target.closest(".view-more");
//   if (clicked) {
//     const id = clicked.dataset.id;
//     window.location.href = `./Pages/meal/meal.html?id=${id}`;
//   }
// });

// function showMealDetails(meal) {
//   if (!meal) {
//     mealDetails.innerHTML = "<p class='text-danger'>Details not found.</p>";
//     return;
//   }

//   // collect ingredients + measures
//   const ingredients = [];
//   for (let i = 1; i <= 20; i++) {
//     const ing = meal[`strIngredient${i}`];
//     const meas = meal[`strMeasure${i}`];
//     if (ing && ing.trim() !== "") {
//       ingredients.push(`${meas ? meas : ""} ${ing}`.trim());
//     }
//   }

//   mealDetails.innerHTML = `
//     <div class="card mb-3">
//       <div class="row g-0">
//         <div class="col-md-4">
//           <img src="${
//             meal.strMealThumb
//           }" class="img-fluid rounded-start" alt="${meal.strMeal}">
//         </div>
//         <div class="col-md-8">
//           <div class="card-body">
//             <h3 class="card-title">${meal.strMeal}</h3>
//             <p><strong>Category:</strong> ${
//               meal.strCategory || "-"
//             } &nbsp; <strong>Area:</strong> ${meal.strArea || "-"}</p>
//             <p><strong>Tags:</strong> ${meal.strTags || "-"}</p>
//             <h5>Instructions</h5>
//             <p>${meal.strInstructions || "-"}</p>
//             <h5>Ingredients</h5>
//             <ul>${ingredients.map((i) => `<li>${i}</li>`).join("")}</ul>
//             <p><strong>Source:</strong> ${
//               meal.strSource
//                 ? `<a href="${meal.strSource}" target="_blank">${meal.strSource}</a>`
//                 : "-"
//             }</p>
//             <p><strong>YouTube:</strong> ${
//               meal.strYoutube
//                 ? `<a href="${meal.strYoutube}" target="_blank">Watch</a>`
//                 : "-"
//             }</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   `;
// }

// /* ---------- UI CONTROLS for each section ---------- */
// async function openSection(action) {
//   currentView = action;
//   controls.innerHTML = "";
//   mealsContainer.innerHTML = "";
//   mealDetails.innerHTML = "";

//   if (action === "search") {
//     // render two inputs
//     controls.innerHTML = `
//       <div class="row g-2">
//         <div class="col-md-6">
//           <input id="searchName" class="form-control" placeholder="Search by meal name (e.g. Chicken)" />
//         </div>
//         <div class="col-md-2">
//           <input id="searchLetter" class="form-control" maxlength="1" placeholder="Search by first letter" />
//         </div>
//         <div class="col-md-4">
//           <button id="searchBtn" class="btn btn-primary">Search</button>
//           <button id="clearBtn" class="btn btn-secondary">Clear</button>
//         </div>
//       </div>
//     `;
//     document.getElementById("searchBtn").addEventListener("click", () => {
//       const name = document.getElementById("searchName").value.trim();
//       fetchMealsByName(name);
//     });
//     document.getElementById("clearBtn").addEventListener("click", () => {
//       document.getElementById("searchName").value = "";
//       document.getElementById("searchLetter").value = "";
//       fetchMealsByName("");
//     });
//     document.getElementById("searchLetter").addEventListener("input", (e) => {
//       const v = e.target.value.trim();
//       if (v.length === 1 && /^[a-zA-Z]$/.test(v)) {
//         fetchMealsByLetter(v);
//       }
//     });

//     // on load show some meals
//     fetchMealsByName("");
//   } else if (action === "categories") {
//     controls.innerHTML = `<h4>Categories</h4><div id="categoriesList" class="d-flex flex-wrap gap-2"></div>`;
//     const cats = await fetchCategoriesList();
//     const container = document.getElementById("categoriesList");
//     cats.forEach((c) => {
//       const btn = document.createElement("button");
//       btn.className = "btn btn-outline-secondary btn-sm";
//       btn.textContent = c.strCategory;
//       btn.addEventListener("click", () => fetchMealsByCategory(c.strCategory));
//       container.appendChild(btn);
//     });
//   } else if (action === "area") {
//     controls.innerHTML = `<h4>Areas</h4><div id="areasList" class="d-flex flex-wrap gap-2"></div>`;
//     const areas = await fetchAreasList();
//     const container = document.getElementById("areasList");
//     areas.forEach((a) => {
//       const btn = document.createElement("button");
//       btn.className = "btn btn-outline-secondary btn-sm";
//       btn.textContent = a.strArea;
//       btn.addEventListener("click", () => fetchMealsByArea(a.strArea));
//       container.appendChild(btn);
//     });
//   } else if (action === "ingredients") {
//     controls.innerHTML = `<h4>Ingredients</h4><div id="ingsList" class="d-flex flex-wrap gap-2"></div>`;
//     const ings = await fetchIngredientsList();
//     const container = document.getElementById("ingsList");
//     // show first 40 ingredients for usability
//     ings.slice(0, 40).forEach((i) => {
//       const btn = document.createElement("button");
//       btn.className = "btn btn-outline-secondary btn-sm";
//       btn.textContent = i.strIngredient;
//       btn.addEventListener("click", () =>
//         fetchMealsByIngredient(i.strIngredient)
//       );
//       container.appendChild(btn);
//     });
//   } else if (action === "contact") {
//     controls.innerHTML = `
//       <h4>Contact / Sign Up</h4>
//       <form id="contactForm" class="row g-2">
//         <div class="col-md-6">
//           <input id="name" class="form-control" placeholder="Name" required />
//           <div class="invalid-feedback">Enter a valid name (letters & spaces only)</div>
//         </div>
//         <div class="col-md-6">
//           <input id="email" class="form-control" placeholder="Email" required />
//           <div class="invalid-feedback">Enter a valid email</div>
//         </div>
//         <div class="col-md-6">
//           <input id="phone" class="form-control" placeholder="Phone" required />
//           <div class="invalid-feedback">Enter a valid phone</div>
//         </div>
//         <div class="col-md-6">
//           <input id="age" class="form-control" placeholder="Age" required />
//           <div class="invalid-feedback">Enter a valid age (1-120)</div>
//         </div>
//         <div class="col-12">
//           <button id="submitBtn" class="btn btn-success" disabled>Submit</button>
//         </div>
//       </form>
//     `;

//     setupContactValidation();
//   }
// }

// /* ---------- CONTACT FORM VALIDATION ---------- */
// function setupContactValidation() {
//   const name = document.getElementById("name");
//   const email = document.getElementById("email");
//   const phone = document.getElementById("phone");
//   const age = document.getElementById("age");
//   const submitBtn = document.getElementById("submitBtn");

//   // regex patterns
//   const nameRegex = /^[A-Za-z\u0600-\u06FF ]{2,50}$/; // allow Arabic letters too
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
//   const phoneRegex = /^[0-9+\-() ]{7,20}$/;
//   const ageRegex = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/; // 1-120

//   function validateAll() {
//     const v1 = nameRegex.test(name.value.trim());
//     const v2 = emailRegex.test(email.value.trim());
//     const v3 = phoneRegex.test(phone.value.trim());
//     const v4 = ageRegex.test(age.value.trim());

//     toggleValidity(name, v1);
//     toggleValidity(email, v2);
//     toggleValidity(phone, v3);
//     toggleValidity(age, v4);

//     submitBtn.disabled = !(v1 && v2 && v3 && v4);
//   }

//   function toggleValidity(el, ok) {
//     if (ok) {
//       el.classList.remove("is-invalid");
//       el.classList.add("is-valid");
//     } else {
//       el.classList.remove("is-valid");
//       el.classList.add("is-invalid");
//     }
//   }

//   [name, email, phone, age].forEach((inp) =>
//     inp.addEventListener("input", validateAll)
//   );
//   // prevent actual submit for exam
//   document.getElementById("contactForm").addEventListener("submit", (e) => {
//     e.preventDefault();
//     alert("Form submitted (for exam demo).");
//   });
// }

/* app.js */

const apiBase = "https://www.themealdb.com/api/json/v1/1";
const mealsContainer = document.getElementById("mealsContainer");
const mealDetails = document.getElementById("mealDetails");
const controls = document.getElementById("controls");
const sideNav = document.getElementById("sideNav");
const toggleNavBtn = document.getElementById("toggleNav");
const menuList = document.getElementById("menuList");

let currentView = ""; // search / categories / area / ingredients / contact

// open initial section (show some meals on load)
window.addEventListener("load", () => {
  openSection("search"); // البداية تظهر "search" controls + default meals
  fetchMealsByName(""); // show some meals on load per spec
});

/* ---------- FETCH HELPERS ---------- */
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network error");
  return res.json();
}

async function fetchMealsByName(name) {
  try {
    const data = await fetchJSON(`${apiBase}/search.php?s=${encodeURIComponent(name)}`);
    const meals = data.meals || [];
    renderMeals(meals.slice(0, 20));
  } catch (err) {
    console.error(err);
    renderMeals([]);
  }
}

async function fetchMealsByLetter(letter) {
  try {
    const data = await fetchJSON(`${apiBase}/search.php?f=${encodeURIComponent(letter)}`);
    const meals = data.meals || [];
    renderMeals(meals.slice(0, 20));
  } catch (err) {
    console.error(err);
    renderMeals([]);
  }
}

async function fetchCategoriesList() {
  const data = await fetchJSON(`${apiBase}/list.php?c=list`);
  return data.meals || [];
}

async function fetchMealsByCategory(category) {
  const data = await fetchJSON(`${apiBase}/filter.php?c=${encodeURIComponent(category)}`);
  const meals = data.meals || [];
  renderMeals(meals.slice(0, 20));
}

async function fetchAreasList() {
  const data = await fetchJSON(`${apiBase}/list.php?a=list`);
  return data.meals || [];
}

async function fetchMealsByArea(area) {
  const data = await fetchJSON(`${apiBase}/filter.php?a=${encodeURIComponent(area)}`);
  const meals = data.meals || [];
  renderMeals(meals.slice(0, 20));
}

async function fetchIngredientsList() {
  const data = await fetchJSON(`${apiBase}/list.php?i=list`);
  return data.meals || [];
}

async function fetchMealsByIngredient(ing) {
  const data = await fetchJSON(`${apiBase}/filter.php?i=${encodeURIComponent(ing)}`);
  const meals = data.meals || [];
  renderMeals(meals.slice(0, 20));
}

async function fetchMealDetailsById(id) {
  const data = await fetchJSON(`${apiBase}/lookup.php?i=${encodeURIComponent(id)}`);
  return (data.meals && data.meals[0]) || null;
}

/* ---------- RENDERING ---------- */
function renderMeals(meals) {
  mealDetails.innerHTML = ""; // hide details
  mealsContainer.innerHTML = "";
  if (!meals || meals.length === 0) {
    mealsContainer.innerHTML = "<p class='text-muted'>No meals found.</p>";
    return;
  }

  meals.forEach(m => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-4 col-lg-3";
    col.innerHTML = `
      <div class="card meal-card meal view-more overflow-hidden">
        <img src="${m.strMealThumb}" class="card-img-top" alt="${m.strMeal}">
        <div class="card-body p-2 text view-more" data-id="${m.idMeal}">
          <div class="position-absolute top-50 translate-middle-y">
            <h3 class="card-title mb-1 mealName">${m.strMeal}</h3>
          </div>
        </div>
      </div>
    `;
    mealsContainer.appendChild(col);
  });
}

// click handler for view details
mealsContainer.addEventListener("click", async (e) => {
  const clicked = e.target.closest(".view-more");
  if (clicked) {
    const id = clicked.dataset.id;
    window.location.href = `./Pages/meal/meal.html?id=${id}`;
  }
});

function showMealDetails(meal) {
  if (!meal) {
    mealDetails.innerHTML = "<p class='text-danger'>Details not found.</p>";
    return;
  }

  // collect ingredients + measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing && ing.trim() !== "") {
      ingredients.push(`${meas ? meas : ""} ${ing}`.trim());
    }
  }

  mealDetails.innerHTML = `
    <div class="p-3">
      <div class="row g-4">
        <div class="col-md-4">
          <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="${meal.strMeal}">
          <h3>${meal.strMeal}</h3>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5>Instructions</h5>
            <p>${meal.strInstructions}</p>
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Area:</strong> ${meal.strArea}</p>
            <p><strong>Tags:</strong> ${meal.strTags || "-"}</p>
            <h5>Ingredients</h5>
            <ul>${ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
            <p><strong>Source:</strong> ${meal.strSource ? `<a href="${meal.strSource}" target="_blank">${meal.strSource}</a>` : "-"}</p>
            <p><strong>Youtube:</strong> ${meal.strYoutube ? `<a href="${meal.strYoutube}" target="_blank">Watch</a>` : "-"}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ---------- UI CONTROLS ---------- */
async function openSection(action) {
  currentView = action;
  controls.innerHTML = "";
  mealsContainer.innerHTML = "";
  mealDetails.innerHTML = "";

  if (action === "search") {
    controls.innerHTML = `
      <div class="row g-2">
        <div class="col-md-6">
          <input id="searchName" class="form-control" placeholder="Search by meal name (e.g. Chicken)" />
        </div>
        <div class="col-md-2">
          <input id="searchLetter" class="form-control" maxlength="1" placeholder="Search by first letter" />
        </div>
        <div class="col-md-4">
          <button id="searchBtn" class="btn btn-primary">Search</button>
          <button id="clearBtn" class="btn btn-secondary">Clear</button>
        </div>
      </div>
    `;
    document.getElementById("searchBtn").addEventListener("click", () => {
      fetchMealsByName(document.getElementById("searchName").value.trim());
    });
    document.getElementById("clearBtn").addEventListener("click", () => {
      document.getElementById("searchName").value = "";
      document.getElementById("searchLetter").value = "";
      fetchMealsByName("");
    });
    document.getElementById("searchLetter").addEventListener("input", (e) => {
      const v = e.target.value.trim();
      if (v.length === 1 && /^[a-zA-Z]$/.test(v)) fetchMealsByLetter(v);
    });
    fetchMealsByName("");
  } 
  else if (action === "categories") {
    controls.innerHTML = `<h4>Categories</h4><div id="categoriesList" class="row g-3"></div>`; 
const cats = await fetchCategoriesList();
const container = document.getElementById("categoriesList");

cats.forEach(c => {
  const col = document.createElement("div");
  col.className = "col-12 col-md-4 col-lg-3";
  col.innerHTML = `
    <div class="card category-card overflow-hidden meal bg-black position-relative text-light">
      <img src="${c.strCategoryThumb}" class="w-75 rounded-circle mx-auto mt-3" alt="${c.strCategory}">
      <div class="card-body text-center">
        <h5 class="card-title mb-1">${c.strCategory}</h5>
        <p class="card-text small">${c.strCategoryDescription.slice(0, 100)}...</p>
        <button class="btn btn-outline-light btn-sm mt-2" data-category="${c.strCategory}">View Meals</button>
      </div>
    </div>
  `;
  const btn = col.querySelector("button");
  btn.addEventListener("click", () => fetchMealsByCategory(c.strCategory));
  container.appendChild(col);
});

  }
  else if (action === "area") {
    controls.innerHTML = `<h4>Areas</h4><div id="areasList" class="d-flex flex-wrap gap-2"></div>`;
    const areas = await fetchAreasList();
    const container = document.getElementById("areasList");
    areas.forEach(a => {
      const btn = document.createElement("button");
      btn.className = "btn btn-outline-secondary btn-sm";
      btn.textContent = a.strArea;
      btn.addEventListener("click", () => fetchMealsByArea(a.strArea));
      container.appendChild(btn);
    });
  }
  else if (action === "ingredients") {
    controls.innerHTML = `<h4>Ingredients</h4><div id="ingsList" class="d-flex flex-wrap gap-2"></div>`;
    const ings = await fetchIngredientsList();
    const container = document.getElementById("ingsList");
    ings.slice(0, 40).forEach(i => {
      const btn = document.createElement("button");
      btn.className = "btn btn-outline-secondary btn-sm";
      btn.textContent = i.strIngredient;
      btn.addEventListener("click", () => fetchMealsByIngredient(i.strIngredient));
      container.appendChild(btn);
    });
  }
  else if (action === "contact") {
    controls.innerHTML = `
      <h4>Contact / Sign Up</h4>
      <form id="contactForm" class="row g-2">
        <div class="col-md-6">
          <input id="name" class="form-control" placeholder="Name" required />
          <div class="invalid-feedback">Enter a valid name (letters & spaces only)</div>
        </div>
        <div class="col-md-6">
          <input id="email" class="form-control" placeholder="Email" required />
          <div class="invalid-feedback">Enter a valid email</div>
        </div>
        <div class="col-md-6">
          <input id="phone" class="form-control" placeholder="Phone" required />
          <div class="invalid-feedback">Enter a valid phone</div>
        </div>
        <div class="col-md-6">
          <input id="age" class="form-control" placeholder="Age" required />
          <div class="invalid-feedback">Enter a valid age (1-120)</div>
        </div>
        <div class="col-12">
          <button id="submitBtn" class="btn btn-success" disabled>Submit</button>
        </div>
      </form>
    `;
    setupContactValidation();
  }
}

/* ---------- CONTACT FORM VALIDATION ---------- */
function setupContactValidation() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const age = document.getElementById("age");
  const submitBtn = document.getElementById("submitBtn");

  const nameRegex = /^[A-Za-z\u0600-\u06FF ]{2,50}$/; // allow Arabic letters too
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRegex = /^[0-9+\-() ]{7,20}$/;
  const ageRegex = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/;

  function validateAll() {
    const v1 = nameRegex.test(name.value.trim());
    const v2 = emailRegex.test(email.value.trim());
    const v3 = phoneRegex.test(phone.value.trim());
    const v4 = ageRegex.test(age.value.trim());

    toggleValidity(name, v1);
    toggleValidity(email, v2);
    toggleValidity(phone, v3);
    toggleValidity(age, v4);

    submitBtn.disabled = !(v1 && v2 && v3 && v4);
  }

  function toggleValidity(el, ok) {
    el.classList.toggle("is-valid", ok);
    el.classList.toggle("is-invalid", !ok);
  }

  [name, email, phone, age].forEach(inp => inp.addEventListener("input", validateAll));
  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Form submitted (for exam demo).");
  });
}
