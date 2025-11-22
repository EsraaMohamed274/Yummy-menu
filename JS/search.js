import { fetchJSON, renderMeals, apiBase } from "./helpers.js";

export function setupSearch(controls, mealsContainer, mealDetails) {
  controls.innerHTML = `
    <div class="row g-2">
      <div class="col-md-6">
        <input id="searchName" class="form-control" placeholder="Search by meal name" />
      </div>
      <div class="col-md-2">
        <input id="searchLetter" class="form-control" maxlength="1" placeholder="Letter" />
      </div>
      <div class="col-md-4">
        <button id="searchBtn" class="btn btn-primary">Search</button>
        <button id="clearBtn" class="btn btn-secondary">Clear</button>
      </div>
    </div>
  `;

  document.getElementById("searchBtn").addEventListener("click", () => {
    fetchMealsByName(controls, mealsContainer, mealDetails);
  });

  document.getElementById("clearBtn").addEventListener("click", () => {
    document.getElementById("searchName").value = "";
    document.getElementById("searchLetter").value = "";
    fetchMealsByName(controls, mealsContainer, mealDetails, "");
  });

  document.getElementById("searchLetter").addEventListener("input", (e) => {
    if (e.target.value.length === 1) {
      fetchMealsByLetter(e.target.value, mealsContainer, mealDetails);
    }
  });

  fetchMealsByName(controls, mealsContainer, mealDetails, "");
}

async function fetchMealsByName(_, mealsContainer, mealDetails, name = "") {
  const data = await fetchJSON(`${apiBase}/search.php?s=${name}`);
  renderMeals((data.meals || []).slice(0, 20), mealsContainer, mealDetails);
}

async function fetchMealsByLetter(letter, mealsContainer, mealDetails) {
  const data = await fetchJSON(`${apiBase}/search.php?f=${letter}`);
  renderMeals((data.meals || []).slice(0, 20), mealsContainer, mealDetails);
}
