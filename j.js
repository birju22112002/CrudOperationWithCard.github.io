/** @format */

// Function to render author names in the author name list
function renderAuthorList() {
  const authorListContainer = document.getElementById("authorList");
  authorListContainer.innerHTML = ""; // Clear the container before rendering

  optionsData.a1.forEach((author, index) => {
    const authorElement = document.createElement("div");
    authorElement.textContent = `${index + 1}. ${author.text}`;

    // Create delete icon
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa fa-trash";
    deleteIcon.style.marginLeft = "15px";
    deleteIcon.addEventListener("click", () => {
      // Remove the author from the optionsData
      optionsData.a1.splice(index, 1);
      // Re-render the author list
      renderAuthorList();
      // Remove the author from the select dropdown
      const selectElement = document.getElementById("searchbar1");
      const optionToRemove = selectElement.querySelector(
        `option[value="${author.value}"]`
      );
      if (optionToRemove) {
        selectElement.removeChild(optionToRemove);
      }
      // Refresh the cards
      refreshCards();
    });

    authorElement.appendChild(deleteIcon);
    authorListContainer.appendChild(authorElement);
  });
}

// Call the function to render the author list initially
renderAuthorList();

function renderAuthorList() {
  const authorListContainer = document.getElementById("authorList");
  authorListContainer.innerHTML = ""; // Clear the container before rendering

  // Create the heading element

  const authorListHeading = document.createElement("h3");
  authorListHeading.textContent = "Author Name List";
  authorListHeading.style.cursor = "pointer"; // Add cursor style
  authorListHeading.addEventListener("click", refreshCards); // Add click event listener

  // Append the heading to the container
  authorListContainer.appendChild(authorListHeading);

  // Check if author list is empty
  if (optionsData.a1.length === 0) {
    const noAuthorsMessage = document.createElement("p");
    noAuthorsMessage.textContent = "No authors available.";
    authorListContainer.appendChild(noAuthorsMessage);
  } else {
    optionsData.a1.forEach((author, index) => {
      const authorElement = document.createElement("div");
      authorElement.textContent = `${index + 1}. ${author.text}`;

      // Create delete icon
      const deleteIcon = document.createElement("i");
      deleteIcon.className = "fa fa-trash";
      deleteIcon.style.marginLeft = "15px";
      deleteIcon.addEventListener("click", () => {
        // Remove the author from the optionsData
        optionsData.a1.splice(index, 1);
        // Re-render the author list
        renderAuthorList();
        // Remove the author from the select dropdown
        const selectElement = document.getElementById("searchbar1");
        const optionToRemove = selectElement.querySelector(
          `option[value="${author.value}"]`
        );
        if (optionToRemove) {
          selectElement.removeChild(optionToRemove);
        }
        // Refresh the cards
        refreshCards();
      });

      authorElement.appendChild(deleteIcon);
      authorListContainer.appendChild(authorElement);
    });
  }
}

renderAuthorList();

function handleAuthorClick(event) {
  event.preventDefault();

  const clickedAuthor = event.target.dataset.author;

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const authorName = card.querySelector("p:nth-child(1) b").textContent; // Adjusted to match the author's name position in the card
    if (authorName === clickedAuthor) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Add click event listener to delete the author and corresponding card
deleteIcon.addEventListener("click", () => {
  // Remove the author from the optionsData
  optionsData.a1.splice(index, 1);
  // Re-render the author list
  renderAuthorList();
  // Remove the author from the select dropdown
  const selectElement = document.getElementById("searchbar1");
  const optionToRemove = selectElement.querySelector(
    `option[value="${author.value}"]`
  );
  if (optionToRemove) {
    selectElement.removeChild(optionToRemove);
  }
  // Remove the corresponding card
  card.remove();
  // Refresh the cards
  refreshCards();
});

function renderAuthorList() {
  const authorListContainer = document.getElementById("authorList");
  authorListContainer.innerHTML = "";

  const authorListHeading = document.createElement("h3");
  authorListHeading.textContent = "Author Name List";

  authorListHeading.style.cursor = "pointer";

  authorListHeading.addEventListener("click", () => {
    refreshCards();
  });

  authorListContainer.appendChild(authorListHeading);

  // Check if author list is empty
  if (optionsData.a1.length === 0) {
    const noAuthorsMessage = document.createElement("p");
    noAuthorsMessage.textContent = "No authors available.";
    authorListContainer.appendChild(noAuthorsMessage);
  } else {
    optionsData.a1.forEach((author, index) => {
      // Create the anchor element for the author
      const authorAnchor = document.createElement("a");
      authorAnchor.href = "#";
      authorAnchor.textContent = `${index + 1}. ${author.text}`;
      authorAnchor.style.cursor = "pointer";
      authorAnchor.style.color = "black";
      authorAnchor.style.textDecoration = "none";

      // Create a unique ID for the author element
      const authorId = `author_${author.value}_${index}`;

      // Create delete icon
      const deleteIcon = document.createElement("i");
      deleteIcon.className = "fa fa-trash";
      deleteIcon.style.marginLeft = "15px";

      // Add click event listener to the delete icon
      deleteIcon.addEventListener("click", () => {
        // Remove the author from the optionsData.a1 array
        optionsData.a1.splice(index, 1);

        // Remove the author from the select dropdown
        const selectElement = document.getElementById("searchbar1");
        const optionToRemove = selectElement.querySelector(
          `option[value="${author.value}"]`
        );
        if (optionToRemove) {
          selectElement.removeChild(optionToRemove);
        }

        // Remove the corresponding card
        const cardToRemove = document.getElementById(
          `card_${author.value}_${index}`
        );
        if (cardToRemove) {
          cardToRemove.remove();
        }

        // Re-render the author list
        renderAuthorList();

        // Refresh the displayed cards
        refreshCards();
      });

      // Create a container for the author element
      const authorElement = document.createElement("div");
      authorElement.appendChild(authorAnchor);
      authorElement.appendChild(deleteIcon);
      authorListContainer.appendChild(authorElement);

      // Associate the author element with its corresponding card using the ID
      author.card = document.getElementById(authorId);
    });
  }
}

renderAuthorList();
