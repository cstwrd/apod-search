const apiKey = "bVoAqAWLxIte9APQLlEvB6Rw7WFUdFKNsHCsWz6B";
const endpoint = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
let apod = {};
const mainImage = document.querySelector(".main-img");
const resultsContainer = document.querySelector(".results");
const titleElement = document.querySelector(".title");

const dateForm = document.querySelector(".date-form");
const dateSearchInput = document.querySelector(".search-date");

const dateRangeForm = document.querySelector(".date-range-form");
const dateRangeStart = document.querySelector(".search-start");
const dateRangeEnd = document.querySelector(".search-end");

const randomForm = document.querySelector(".random-form");
const randomSearchInput = document.querySelector(".search-random");

const searchResults = [];

function displayResult(result) {
  const html = `
  <h1 class="title">${result.title}</h1>
  <img class="main-img" src="${result.url}" alt="${result.title}" />
  `;
  resultsContainer.innerHTML = html;
}

function displayResults(searchResults) {
  // Remove copyright images from results
  const filteredResults = searchResults.filter((result) => !result.copyright);
  // Update html with search results
  const html = filteredResults
    .map((result) => {
      return `
    <h1 class="title">${result.title}</h1>
    <img class="main-img" src="${result.url}" alt="${result.title}" />
    `;
    })
    .join("");

  resultsContainer.innerHTML = html;
}

function fetchByDate(searchDate) {
  const url = endpoint + `&date=${searchDate}`;
  fetch(url)
    .then((blob) => blob.json())
    .then((data) => {
      if (!data.url) {
        titleElement.innerHTML = "Cannot search a future date";
      } else {
        displayResult(data);
      }
    });
}

function fetchByDateRange(startDate, endDate) {
  const url = endpoint + `&start_date=${startDate}&end_date=${endDate}`;
  fetch(url)
    .then((blob) => blob.json())
    .then((data) => {
      displayResults(data);
    });
}

function fetchRandom(count) {
  const url = endpoint + `&count=${count}`;
  fetch(url)
    .then((blob) => blob.json())
    .then((data) => {
      if (count === 1) {
        displayResult(data);
      } else {
        displayResults(data);
      }
    });
}

dateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = dateSearchInput.value;
  fetchByDate(searchTerm);
});

dateRangeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const startDate = dateRangeStart.value;
  const endDate = dateRangeEnd.value;
  fetchByDateRange(startDate, endDate);
});

randomForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const count = randomSearchInput.value;
  fetchRandom(count);
});
