const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const recipeContainer = document.getElementById("recipe-container");
const recipeModal = document.getElementById("recipe-modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.getElementById("close-btn");

async function searchRecipes() {

    const searchValue = searchInput.value.trim();

    if (searchValue === "") {
        alert("Please enter a meal name.");
        return;
    }

    const apiUrl =
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;

    try {

        const response = await fetch(apiUrl);

        const data = await response.json();

        displayRecipes(data.meals);

    } catch (error) {

        recipeContainer.innerHTML = `
            <div class="error-message">
                <h2>Something went wrong</h2>
                <p>Please try again later.</p>
            </div>
        `;

        console.log("Error fetching recipes:", error);

    }
}

function getIngredients(meal) {

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {

        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {

            ingredients.push(`${measure} ${ingredient}`);

        }
    }

    return ingredients;
}

function openRecipeModal(meal) {

    modalBody.innerHTML = `
        <img 
            src="${meal.strMealThumb}" 
            alt="${meal.strMeal}"
            class="modal-image"
        />

        <h2 class="modal-title">
            ${meal.strMeal}
        </h2>

        <p class="modal-category">
            ${meal.strCategory}
        </p>

        <h3>Ingredients</h3>

        <ul class="ingredients-list">
            ${getIngredients(meal)
                .map((ingredient) =>
                    `<li>${ingredient}</li>`
                )
                .join("")}
        </ul>

        <div class="modal-instructions">

            <h3>Instructions</h3>

            <p>
                ${meal.strInstructions}
            </p>

        </div>
    `;

    recipeModal.style.display = "flex";
}

function displayRecipes(meals) {

    recipeContainer.innerHTML = "";

    if (!meals) {

        recipeContainer.innerHTML = `
            <div class="error-message">
                <h2>No recipes found</h2>
                <p>Please try searching for another meal.</p>
            </div>
        `;

        return;
    }

    meals.forEach((meal) => {

        const recipeCard = `
            <div class="recipe-card">

                <img 
                    src="${meal.strMealThumb}" 
                    alt="${meal.strMeal}"
                />

                <div class="recipe-content">

                    <h2>${meal.strMeal}</h2>

                    <p class="category">
                        ${meal.strCategory}
                    </p>

                    <p class="instructions">
                        ${meal.strInstructions.slice(0, 120)}...
                    </p>

                    <h3>Ingredients:</h3>

                    <ul class="ingredients-list">
                        ${getIngredients(meal)
                        .slice(0, 5)
                        .map((ingredient) =>
                    `<li>${ingredient}</li>`
                    )
                    .join("")}
                </ul>

                <button 
                    class="view-recipe-btn"
                    onclick="openRecipeModal(${JSON.stringify(meal).replace(/"/g, '&quot;')})"
                >
                    View Recipe
                </button>

                </div>

            </div>
        `;

        recipeContainer.innerHTML += recipeCard;

    });
}

searchButton.addEventListener("click", searchRecipes);

closeBtn.addEventListener("click", () => {
    recipeModal.style.display = "none";
});