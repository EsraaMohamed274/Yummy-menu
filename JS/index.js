const apiBase = "https://www.themealdb.com/api/json/v1/1";
const mealsContainer = document.getElementById("mealsContainer");
const mealDetails = document.getElementById("mealDetails");
const controls = document.getElementById("controls");
const sideNav = document.getElementById("sideNav");
const toggleNavBtn = document.getElementById("toggleNav");
const menuList = document.getElementById("menuList");


// open initial section (show some meals on load)
window.addEventListener("load", () => {
  fetchMealsByName(""); // show some meals on load per spec
});

/* ---------- FETCH HELPERS ---------- */
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network error");
  return res.json();
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

