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

async function fetchMealsByName() {
  try {
    const data = await fetchJSON(
      `${apiBase}/search.php?s=`
    );
    const meals = data.meals || [];
    renderMeals(meals.slice(0, 20));
  } catch (err) {
    console.error(err);
    renderMeals([]);
  }
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
      <div class="card meal-card meal view-more overflow-hidden border-0">
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
   const mealCard = e.target.closest(".view-more");
  if (mealCard && mealCard.dataset.id) {
    console.log(window.location.pathname);
    window.location.href = `../meal/meal.html?id=${mealCard.dataset.id}`;
  }
});

function showMealDetails(meal) {
  if (!meal) {
    mealDetails.innerHTML = "<p class='text-danger'>Details not found.</p>";
    return;
  }


}

