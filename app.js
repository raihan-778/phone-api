console.log("scripted connected");

const loadPhones = async (inputValue, dataLimit) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
  );
  const data = await res.json();
  console.log(data);
  displayPhones(data.data, dataLimit);
};
//code for process search
const processSearch = (dataLimit) => {
  toggleSpin(true);
  const inputField = document.getElementById("search-input");
  const inputText = inputField.value;
  loadPhones(inputText, dataLimit);
};

const searchPhone = () => {
  //load spinner
  processSearch(15);
};
//handle search btn
document.getElementById("btn-search").addEventListener("click", () => {
  searchPhone();
});

// search input field enter key handler

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    processSearch(15);
  }
});

const displayPhones = (phones, dataLimit) => {
  //show 15 phons only
  const showAllDiv = document.getElementById("show-all");
  if (dataLimit && phones.length > 15) {
    phones = phones.slice(0, 15);
    showAllDiv.classList.remove("d-none");
  } else {
    showAllDiv.classList.add("d-none");
  }
  //no found msg code
  const noFoundMsg = document.getElementById("no-found-msg");
  if (phones.length === 0) {
    noFoundMsg.classList.remove("d-none");
  } else {
    noFoundMsg.classList.add("d-none");
  }

  console.log(phones);
  const phoneContainer = document.getElementById("card-container");
  phoneContainer.textContent = "";
  phones.forEach((phone) => {
    console.log(phone);
    const { brand, image, phone_name, slug } = phone;
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card h-100">
      <img src="${image}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${brand}</h5>
        <p class="card-text">
        ${phone_name}
        </p>
      </div>
      <button
      onclick=(loadPhoneDetail('${slug}'))
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#model-popup"
    >
      Model Button
    </button>
    </div>
    `;
    phoneContainer.appendChild(phoneDiv);
  });

  //hide spinner
  toggleSpin(false);
};

const loadPhoneDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data);
};

const displayPhoneDetails = (data) => {
  console.log(data.data);
  const modelHeader = document.getElementById("model-header");
  const modelBody = document.getElementById("modal-body");
  modelHeader.innerHTML = `
  <h1>${data.data.brand}</h1>
  `;
  modelBody.innerHTML = `
  <p>${data.data.name}</p>
  `;
};

// function for spinner
const toggleSpin = (isLoading) => {
  const loadSpin = document.getElementById("loading-spin");
  if (isLoading) {
    loadSpin.classList.remove("d-none");
  } else {
    loadSpin.classList.add("d-none");
  }
};
//this is not the best way to show all data

const showAllBtn = document.getElementById("btn-show-all");
showAllBtn.addEventListener("click", () => {
  processSearch();
});
