const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const recipeContainer = document.getElementById("recipe-container");

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

        console.log("Error fetching recipes:", error);

    }
}

function displayRecipes(meals) {

    recipeContainer.innerHTML = "";

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
                        ${meal.strInstructions.slice(0, 150)}...
                    </p>

                </div>

            </div>
        `;

        recipeContainer.innerHTML += recipeCard;

    });
}

searchButton.addEventListener("click", searchRecipes);