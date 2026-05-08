const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

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

        console.log(data);

    } catch (error) {

        console.log("Error fetching recipes:", error);

    }
}

searchButton.addEventListener("click", searchRecipes);