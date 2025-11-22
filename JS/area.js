const apiBase = "https://www.themealdb.com/api/json/v1/1";
const mealsContainer = document.getElementById("mealsContainer");
const controls = document.getElementById("controls");

// Fetch helper
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network error");
  return res.json();
}

async function fetchAreaWithImages() {
  const data = await fetchJSON(`${apiBase}/list.php?a=list`);
  console.log(data.meals)
  return data.meals || [];
}


// Fetch meals by area
async function fetchMealsByArea(area) {
  mealsContainer.innerHTML = "<p class='text-muted'>Loading meals...</p>";
  const data = await fetchJSON(`${apiBase}/filter.php?a=${encodeURIComponent(area)}`);
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

// Render area like meals
function renderArea(area) {
  mealsContainer.innerHTML = "";
  area.forEach((a) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-4 col-lg-3 mb-3";
    col.innerHTML = `
    
      <div class="card area-card bg-black text-white">
        
        <div class="card-body p-2 view-more text-center">
        <i class="fa-solid fa-house-laptop mb-3 fa-5x"></i>

        <h4 class="card-title mb-0 text-white">${a.strArea}</h4>
         
        </div>
      </div>
      
    `;
    console.log(a.strArea)
    col.querySelector(".area-card").addEventListener("click", () => {
      fetchMealsByArea(a.strArea);
    });
    mealsContainer.appendChild(col);
  });
}

// Load area on page load
window.addEventListener("load", async () => {
  const area = await fetchAreaWithImages();
  renderArea(area);
});

mealsContainer.addEventListener("click", (e) => {
  const mealCard = e.target.closest(".view-more");
  if (mealCard && mealCard.dataset.id) {
    window.location.href = `../meal/meal.html?id=${mealCard.dataset.id}`;
  }
});
