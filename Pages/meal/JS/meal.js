const apiBase = "https://www.themealdb.com/api/json/v1/1";
const mealDetails = document.getElementById("mealDetails");

// Get meal id from URL
const params = new URLSearchParams(window.location.search);
const mealId = params.get("id");

console.log("Meal ID:", mealId);

// Fetch meal details
async function fetchMealDetailsById(id) {
  const res = await fetch(`${apiBase}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}

// Display details
async function loadMealDetails() {
  const meal = await fetchMealDetailsById(mealId);

  if (!meal) {
    mealDetails.innerHTML = "<p class='text-danger'>Meal not found.</p>";
    return;
  }

  // ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing) ingredients.push(`${meas || ""} ${ing}`);
  }

  mealDetails.innerHTML = `
    <div class="card">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="${meal.strMeal}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h3>${meal.strMeal}</h3>
            <h5>Instructions</h5>
            <p>${meal.strInstructions}</p>
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Area:</strong> ${meal.strArea}</p>
            <p><strong>Tags:</strong> ${meal.strTags || "-"}</p>
            
            <h5>Ingredients</h5>
            <ul>${ingredients.map((i) => `<li>${i}</li>`).join("")}</ul>
            <p><strong>Source:</strong> <a href="${meal.strSource}" target="_blank">${meal.strSource}</a></p>
            <p><strong>Youtube:</strong> <a href="${meal.strYoutube}" target="_blank">Watch</a></p>
          </div>
        </div>
      </div>
    </div>`;
}

loadMealDetails();
