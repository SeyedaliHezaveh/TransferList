const leftSide = document.querySelector(".left-side");
const rightSide = document.querySelector(".right-side");

const allToRightButton = document.querySelector(".all-to-right");
const allToLeftButton = document.querySelector(".all-to-left");
const checkedToRightButton = document.querySelector(".checked-to-right");
const checkedToLeftButton = document.querySelector(".checked-to-left");

let leftList = [
  { id: "item1", checked: false, title: "PHP" },
  { id: "item2", checked: false, title: "Python" },
  { id: "item3", checked: false, title: "Ruby" },
  { id: "item4", checked: false, title: "C++" },
];

let rightList = [
  { id: "item5", checked: false, title: "HTML" },
  { id: "item6", checked: false, title: "Css" },
  { id: "item7", checked: false, title: "JavaScript" },
  { id: "item8", checked: false, title: "Java" },
];

renderDom(leftList, rightList);

// Render Dom
function renderDom(leftListToRender, rightListToRender) {
  clearDom();
  
  leftListToRender.forEach((item) => {
    leftSide.innerHTML += `<div class="box">
        <input type="checkbox" class="input-box" id="${item.id}" />
        <label for="${item.id}">${item.title}</label>
        </div>`;
  });

  rightListToRender.forEach((item) => {
    rightSide.innerHTML += `<div class="box">
          <input type="checkbox" class="input-box" id="${item.id}" />
          <label for="${item.id}">${item.title}</label>
          </div>`;
  });

  updateButtonStates();
  registerEvents();
}

// Clear Dom
function clearDom() {
  document.querySelectorAll(".side").forEach((el) => {
    el.innerHTML = "";
  });
}

// Update button states based on list conditions
function updateButtonStates() {
  if (leftList.length === 0) {
    allToRightButton.classList.add("disabled");
    checkedToRightButton.classList.add("disabled");
  } else {
    allToRightButton.classList.remove("disabled");
    checkedToRightButton.classList.remove("disabled");
  }

  if (rightList.length === 0) {
    allToLeftButton.classList.add("disabled");
    checkedToLeftButton.classList.add("disabled");
  } else {
    allToLeftButton.classList.remove("disabled");
    checkedToLeftButton.classList.remove("disabled");
  }
}

// Event Handlers
function registerEvents() {
  allToRightButton.addEventListener("click", () => {
    if (leftList.length > 0) {
      rightList = leftList.concat(rightList);
      leftList = [];
      renderDom(leftList, rightList);
    }
  });

  allToLeftButton.addEventListener("click", () => {
    if (rightList.length > 0) {
      leftList = rightList.concat(leftList);
      rightList = [];
      renderDom(leftList, rightList);
    }
  });

  checkedToRightButton.addEventListener("click", () => {
    const checkedItems = leftList.filter(item => document.getElementById(item.id).checked);
    leftList = leftList.filter(item => !document.getElementById(item.id).checked);
    rightList = [...checkedItems, ...rightList]
    renderDom(leftList, rightList);
  });

  checkedToLeftButton.addEventListener("click", () => {
    const checkedItems = rightList.filter(item => document.getElementById(item.id).checked);
    rightList = rightList.filter(item => !document.getElementById(item.id).checked);
    leftList = [...checkedItems, ...leftList];
    renderDom(leftList, rightList);
  });
}
