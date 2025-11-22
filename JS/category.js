const apiBase = "https://www.themealdb.com/api/json/v1/1";
const mealsContainer = document.getElementById("mealsContainer");
const controls = document.getElementById("controls");

// Fetch helper
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network error");
  return res.json();
}

// Fetch categories with images and description
async function fetchCategoriesWithImages() {
  const data = await fetchJSON(`${apiBase}/categories.php`);
  return data.categories || [];
}

// Fetch meals by category
async function fetchMealsByCategory(category) {
  const data = await fetchJSON(
    `${apiBase}/filter.php?c=${encodeURIComponent(category)}`
  );
  const meals = data.meals || [];
  renderMeals(meals.slice(0, 20));
}

// Render meals
function renderMeals(meals) {
  mealsContainer.innerHTML = "";
  if (!meals || meals.length === 0) {
    mealsContainer.innerHTML = "<p class='text-muted'>No meals found.</p>";
    return;
  }

  meals.forEach((m) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-4 col-lg-3 mb-3";
    col.innerHTML = `
      <div class="card meal-card meal overflow-hidden border-0">
        <img src="${m.strMealThumb}" class="card-img-top" alt="${m.strMeal}">
        <div class=" card-body p-2 text view-more" data-id="${m.idMeal}">
          <div class="position-absolute top-50 translate-middle-y">
  <h3 class="card-title mb-1 mealName">${m.strMeal}</h3>
</div>

        </div>
      </div>
    `;
    mealsContainer.appendChild(col);
  });
}

// Render categories like meals
function renderCategories(categories) {
  mealsContainer.innerHTML = "";
  categories.forEach((c) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-4 col-lg-3 mb-3";
    col.innerHTML = `
    
      <div class="card category-card overflow-hidden meal bg-black">
        <img src="${c.strCategoryThumb}"class="w-75 rounded-circle" alt="${
      c.strCategory
    }">
        <div class="card-body p-2 text view-more">
                    <div class="position-absolute top-50 translate-middle-y">

        <h5 class="card-title mb-0">${c.strCategory}</h5>
          <p class="card-text small">${c.strCategoryDescription.slice(
            0,
            100
          )}...</p>
        </div>
        </div>
      </div>
      
    `;
    col.querySelector(".category-card").addEventListener("click", () => {
      fetchMealsByCategory(c.strCategory);
    });
    mealsContainer.appendChild(col);
  });
}

// Load categories on page load
window.addEventListener("load", async () => {
  const cats = await fetchCategoriesWithImages();
  renderCategories(cats);
});

mealsContainer.addEventListener("click", (e) => {
  const mealCard = e.target.closest(".view-more");
  if (mealCard && mealCard.dataset.id) {
    window.location.href = `../meal/meal.html?id=${mealCard.dataset.id}`;
  }
});
