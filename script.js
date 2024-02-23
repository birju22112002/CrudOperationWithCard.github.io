/** @format */

const optionsData = {
  a1: [
    { value: "hello", text: "hello" },
    { value: "Harsh", text: "Harsh" },
    { value: "Ruskin", text: "Ruskin" },
    { value: "Bale", text: "Bale" },
    { value: "Robert", text: "Robert" },
    { value: "Chetan", text: "Chetan" },
    { value: "Ch", text: "Ch" },
  ],
  a2: [
    { value: "Educational", text: "Educational" },
    { value: "Business", text: "Business" },
    { value: "Lifestyle", text: "Lifestyle" },
    { value: "Travel", text: "Travel" },
    { value: "Environment", text: "Environment" },
  ],
};

function createSelect(containerId) {
  const selectElement = document.createElement("select");
  selectElement.id = "searchbar" + containerId.slice(1);
  selectElement.style.width = "132px";
  selectElement.style.backgroundColor = "transparent";

  const options = optionsData[containerId];

  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    selectElement.appendChild(optionElement);
  });

  const selectContainer = document.getElementById(containerId);

  selectContainer.appendChild(selectElement);
}

createSelect("a1");
createSelect("a2");

function createList(containerId, dataList, clickHandler) {
  const listContainer = document.getElementById(containerId);
  dataList.forEach((item, index) => {
    const anchor = document.createElement("a");
    anchor.href = "#";
    anchor.textContent = `${index + 1}. ${item.text}`;
    anchor.dataset[containerId.slice(0, 1) === "a" ? "author" : "category"] =
      item.value;
    anchor.addEventListener("click", clickHandler);

    const itemElement = document.createElement("div");

    itemElement.appendChild(anchor);
    listContainer.appendChild(itemElement);
    anchor.style.textDecoration = "none";
    anchor.style.color = "#000";
  });
}

createList("authorList", optionsData.a1);
createList("categoryList", optionsData.a2);

// card create

function addNewRecord() {
  const title = document.getElementById("t1").value;
  const description = document.querySelector("#container textarea").value;
  const author = document.getElementById("searchbar1").value;
  const category = document.getElementById("searchbar2").value;

  const currentDate = new Date();
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  const dateTimeString = currentDate.toLocaleString("en-US", options);

  const newCard = document.createElement("div");
  newCard.classList.add("card");

  newCard.style.width = "450px";
  newCard.style.height = "475px";

  const cardContent = `
    <img src="pexels-photo-2263436.jpeg" alt="Placeholder Image" />
    <div class="card-content">
    <div style="justify-content: space-between; display:flex">
      <p><b>${author}</b></p>
      <p><b>${category}</b></p>
    </div>
      <br />
      <p style="font-size:15px"><i class="fa-regular fa-calendar" style="color: #000000;"></i> ${dateTimeString} 
        <button class="edit-button" onClick="editTask(this)">Edit</button>
        <button class="delete-button" onClick="deleteCard(this)">Delete</button>
      </p>
      <br />
      <h2 id="a">${title}</h2>
      <br />
      <p id="b">${description}</p>

    </div>`;

  resetForm();

  newCard.innerHTML = cardContent;

  document.body.appendChild(newCard);
}

// delete

let deleteCard = (e) => {
  e.parentElement.parentElement.parentElement.remove();
};

// reset

function resetForm() {
  document.getElementById("t1").value = "";
  document.querySelector("#container textarea").value = "";
}

// edit

function editTask(e) {
  let selectedTask = e.parentElement.parentElement.parentElement;

  document.getElementById("t1").value =
    selectedTask.querySelector("#a").innerText;
  document.querySelector("#container textarea").value =
    selectedTask.querySelector("#b").innerText;

  selectedTask.remove();
}

// refresh card

function refreshCards() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.style.display = "block";
  });
}

document
  .getElementById("authorListHeading")
  .addEventListener("click", function () {
    refreshCards();
  });

document
  .getElementById("categoryListHeading")
  .addEventListener("click", function () {
    refreshCards();
  });

// render author list and also delete

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
    noAuthorsMessage.textContent = "ALL AUTHOR DELETED";
    authorListContainer.appendChild(noAuthorsMessage);
  } else {
    optionsData.a1.forEach((author, index) => {
      // Create the anchor element
      const authorAnchor = document.createElement("a");
      authorAnchor.href = "#";
      authorAnchor.textContent = `${index + 1}. ${author.text}`;
      authorAnchor.style.cursor = "pointer";
      authorAnchor.style.color = "black";
      authorAnchor.style.textDecoration = "none";

      // filter
      authorAnchor.addEventListener("click", () => {
        const clickedAuthor = author.text;
        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
          const authorName = card.querySelector("p:nth-child(1) b").textContent;
          if (authorName === clickedAuthor) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });

      // Create delete icon
      const deleteIcon = document.createElement("i");
      deleteIcon.className = "fa fa-trash";
      deleteIcon.style.marginLeft = "15px";
      deleteIcon.style.cursor = "pointer";

      deleteIcon.addEventListener("click", () => {
        // optionsData.a1.splice(index, 1);
        const authorName = author.text;
        const cards = document.querySelectorAll(".card");

        // Delete cards
        cards.forEach((card) => {
          if (
            card.querySelector("p:nth-child(1) b").textContent === authorName
          ) {
            card.remove();
          }
        });

        // Remove author from optionsData
        const authorIndex = optionsData.a1.findIndex(
          (item) => item.value === author.value
        );
        if (authorIndex !== -1) {
          optionsData.a1.splice(authorIndex, 1);
        }
        // selectoption remove
        const selectElement = document.getElementById("searchbar1");
        const optionToRemove = selectElement.querySelector(
          `option[value="${author.value}"]`
        );
        if (optionToRemove) {
          selectElement.removeChild(optionToRemove);
        }

        renderAuthorList();
        refreshCards();
      });

      const authorElement = document.createElement("div");
      authorElement.appendChild(authorAnchor);
      authorElement.appendChild(deleteIcon);
      authorListContainer.appendChild(authorElement);
    });
  }
}

renderAuthorList();

// render category list and also delete

function renderCategoryList() {
  const categoryListContainer = document.getElementById("categoryList");
  categoryListContainer.innerHTML = "";

  const categoryListHeading = document.createElement("h3");
  categoryListHeading.textContent = "Category List";
  categoryListHeading.style.cursor = "pointer";

  categoryListHeading.addEventListener("click", () => {
    refreshCards();
  });

  categoryListContainer.appendChild(categoryListHeading);

  if (optionsData.a2.length === 0) {
    const noCategoriesMessage = document.createElement("p");
    noCategoriesMessage.textContent = "ALL CATEGORY DELETED";
    categoryListContainer.appendChild(noCategoriesMessage);
  } else {
    optionsData.a2.forEach((category, index) => {
      const categoryAnchor = document.createElement("a");
      categoryAnchor.href = "#";
      categoryAnchor.textContent = `${index + 1}. ${category.text}`;
      categoryAnchor.style.cursor = "pointer";
      categoryAnchor.style.color = "black";
      categoryAnchor.style.textDecoration = "none";

      categoryAnchor.addEventListener("click", () => {
        const clickedCategory = category.text;
        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
          const categoryName =
            card.querySelector("p:nth-child(2) b").textContent;
          if (categoryName === clickedCategory) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });

      const deleteIcon = document.createElement("i");
      deleteIcon.className = "fa fa-trash";
      deleteIcon.style.marginLeft = "15px";
      deleteIcon.style.cursor = "pointer";

      deleteIcon.addEventListener("click", () => {
        const categoryName = category.text;
        const cards = document.querySelectorAll(".card");

        cards.forEach((card) => {
          if (
            card.querySelector("p:nth-child(2) b").textContent === categoryName
          ) {
            card.remove();
          }
        });

        const categoryIndex = optionsData.a2.findIndex(
          (item) => item.value === category.value
        );
        if (categoryIndex !== -1) {
          optionsData.a2.splice(categoryIndex, 1);
        }

        const selectElement = document.getElementById("searchbar2");
        const optionToRemove = selectElement.querySelector(
          `option[value="${category.value}"]`
        );
        if (optionToRemove) {
          selectElement.removeChild(optionToRemove);
        }

        renderCategoryList();
        refreshCards();
      });

      const categoryElement = document.createElement("div");
      categoryElement.appendChild(categoryAnchor);
      categoryElement.appendChild(deleteIcon);
      categoryListContainer.appendChild(categoryElement);
    });
  }
}

renderCategoryList();
