const apiBase = "https://www.themealdb.com/api/json/v1/1";
const mealsContainer = document.getElementById("mealsContainer");
const controls = document.getElementById("controls");

// Fetch helper
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network error");
  return res.json();
}

async function fetchIngredientsWithImages() {
  const data = await fetchJSON(`${apiBase}/list.php?i=list`);
  return data.meals || [];
}

// Fetch meals by Ingredients
async function fetchMealsByIngredients(Ingredients) {
  mealsContainer.innerHTML = "<p class='text-muted'>Loading meals...</p>";
  const data = await fetchJSON(
    `${apiBase}/filter.php?i=${encodeURIComponent(Ingredients)}`
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
      <div class="  card meal-card meal overflow-hidden border-0 view-more">
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

// Render Ingredients like meals
function renderIngredients(Ingredients = []) {
  mealsContainer.innerHTML = "";

  Ingredients.slice(0, 20).forEach((ingredient) => {
  const col = document.createElement("div");
  col.className = "col-12 col-md-4 col-lg-3 mb-3";

  col.innerHTML = `
    <div class="card Ingredients-card bg-black text-white">
      <div class="card-body p-2 view-more text-center">
        <i class="fa-solid fa-drumstick-bite fa-5x"></i>
        <h4 class="card-title mb-0 text-white">${ingredient.strIngredient}</h4>
      </div>
    </div>
  `;

  col.querySelector(".Ingredients-card").addEventListener("click", () => {
    fetchMealsByIngredients(ingredient.strIngredient);
  });

  mealsContainer.appendChild(col);
});
}

renderIngredients()

// Load Ingredients on page load
window.addEventListener("load", async () => {
  const Ingredients = await fetchIngredientsWithImages();
  if (Ingredients && Ingredients.length > 0) {
    renderIngredients(Ingredients);
  }
});



mealsContainer.addEventListener("click", (e) => {
  const mealCard = e.target.closest(".view-more");
  if (mealCard && mealCard.dataset.id) {
    window.location.href = `../meal/meal.html?id=${mealCard.dataset.id}`;
  }
});
