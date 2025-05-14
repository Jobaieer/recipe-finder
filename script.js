document.addEventListener("DOMContentLoaded", () => {
  let randerData = document.getElementById("racipesData");

  const loader = document.getElementById("loader");
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");
  const closeModal = document.getElementById("closeModal");

  const mobileMenu = document.getElementById("mobileMenu");
  const menuOpen = document.getElementById("menuOpen");
  const menuClose = document.getElementById("menuClose");

  menuOpen.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
  });

  menuClose.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });

  // Show modal function
  function showModal(recipe) {
    modalContent.innerHTML = `
    <h2 class="text-2xl font-bold mb-2">${recipe.name}</h2>
    <img src="${recipe.image}" alt="${recipe.name}" class="w-full h-48 object-cover rounded mb-4">
    <p class="mb-2"><strong>Description:</strong> ${recipe.description}</p>
    <p class="mb-2"><strong>Ingredients:</strong> ${recipe.ingredients}</p>
    <p><strong>Instructions:</strong> ${recipe.instructions}</p>
    <p><strong>Preparation Time:</strong> ${recipe.prepTime} minutes</p>
    <p><strong>Cooking Time:</strong> ${recipe.cookTime} minutes</p>
    <p><strong>Meal Type:</strong> ${recipe.mealType}</p>
  `;
    modal.classList.remove("hidden");
  }

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  async function getData() {
    loader.classList.remove("hidden");
    try {
      const response = await fetch("https://dummyjson.com/recipes");
      const data = await response.json();

      data.recipes.forEach((ele) => {
        // Create a card for each recipe
        const recipeCard = document.createElement("div");
        recipeCard.className =
          "bg-white rounded-xl shadow-md overflow-hidden border-yellow-200 border-1 my-4 hover:shadow-amber-200 shadow-lg transition duration-300";

        recipeCard.innerHTML = `
          <img src="${ele.image}" alt="${ele.name}" class="w-full h-48 object-cover">
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">${ele.name}</h2>
            <div class="flex items-center gap-2 justify-between"> 
            <p class="text-sm text-gray-600"><strong>Ratings:</strong> ${ele.rating}</p>
            <p class="text-sm "><strong>Review Count:</strong> ${ele.reviewCount}</p>
            </div>
          </div>
          <div class="flex items-center justify-center mb-4">
            <button class="view-btn bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 transition duration-300 hover:cursor-pointer">
              View Recipe
            </button>
          </div>
        `;

        // Add event listener to View button
        recipeCard.querySelector(".view-btn").addEventListener("click", (e) => {
          e.preventDefault(); // prevent default form/link behavior
          showModal(ele); // open modal
        });

        randerData.appendChild(recipeCard);
      });
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      loader.classList.add("hidden"); // Hide loader no matter what
    }
  }

  getData();
});
