const apiBase = "https://www.themealdb.com/api/json/v1/1";
const mealDetails = document.getElementById("mealDetails");

// Get meal id from URL
const params = new URLSearchParams(window.location.search);
const mealId = params.get("id");

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
    <div class="p-1  p-md-5 text-white">
      <div class="row g-4">
        <div class="col-md-4 p-md-5">
          <img src="${
            meal.strMealThumb
          }" class="rounded-start" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
          </div>
        <div class="col-md-7">
          <div class="card-body">
            <h2>Instructions</h2>
            <p><small>${meal.strInstructions}</small></p>
            <h4><strong>Category:</strong> ${meal.strCategory}</h4>
            <h4><strong>Area:</strong> ${meal.strArea}</h4>
            
            <h4>Recipes:</h4>
            <ul class="text-decoration-none p-0">${ingredients
              .map((i) => `<li class="btn btn-light m-1">${i}</li>`)
              .join("")}</ul>
              <h4><strong>Tags:</strong>
              <button class="btn btn-outline-danger d-block my-3 mx-1"
              target="_blank">${meal.strTags || "-"}</button>
              </h4>

            <button class="btn btn-success" href="${
              meal.strSource
            }" target="_blank">Source</button>
            <button class="btn btn-danger" href="${
              meal.strYoutube
            }" target="_blank">Youtube</button></p>
          </div>
        </div>
                  <div class="col-md-1"></div>

      </div>
    </div>`;
}

loadMealDetails();
