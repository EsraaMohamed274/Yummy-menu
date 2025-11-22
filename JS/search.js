const apiBase = "https://www.themealdb.com/api/json/v1/1";
const mealsContainer = document.getElementById("mealsContainer");
const controls = document.getElementById("controls");
const mealDetails = document.getElementById("mealDetails");

// Fetch helper
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network error");
  return res.json();
}

async function fetchMealsByName(name) {
  try {
    const data = await fetchJSON(
      `${apiBase}/search.php?s=${encodeURIComponent(name)}`
    );
    const meals = data.meals || [];
    renderMeals(meals.slice(0, 20));
  } catch (err) {
    console.error(err);
    renderMeals([]);
  }
}

async function fetchMealsByLetter(letter) {
  try {
    const data = await fetchJSON(
      `${apiBase}/search.php?f=${encodeURIComponent(letter)}`
    );
    const meals = data.meals || [];
    renderMeals(meals.slice(0, 20));
  } catch (err) {
    console.error(err);
    renderMeals([]);
  }
}

controls.innerHTML = "";
mealsContainer.innerHTML = "";
mealDetails.innerHTML = "";

controls.innerHTML = `
      <div class="row g-2">
        <div class="col-md-6">
          <input id="searchName" class="form-control" placeholder="Search by meal name (e.g. Chicken)" />
        </div>
        <div class="col-md-6">
          <input id="searchLetter" class="form-control" maxlength="1" placeholder="Search by first letter" />
        </div>

      </div>
    `;
document.getElementById("searchName").addEventListener("input", () => {
  fetchMealsByName(document.getElementById("searchName").value.trim());
});
document.getElementById("searchLetter").addEventListener("input", (e) => {
  const v = e.target.value.trim();
  if (v.length === 1 && /^[a-zA-Z]$/.test(v)) fetchMealsByLetter(v);
});

/* ---------- RENDERING ---------- */
function renderMeals(meals) {
  mealDetails.innerHTML = ""; 
  mealsContainer.innerHTML = "";
  if (!meals || meals.length === 0) {
    mealsContainer.innerHTML = "<p class='text-muted'>No meals found.</p>";
    return;
  }

  meals.forEach((m) => {
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

async function fetchMealDetailsById(id) {
  const data = await fetchJSON(
    `${apiBase}/lookup.php?i=${encodeURIComponent(id)}`
  );
  return (data.meals && data.meals[0]) || null;
}

mealsContainer.addEventListener("click", (e) => {
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
