//This line imports variables from the data.js module.
import { authors, genres, books, BOOKS_PER_PAGE } from "./data.js";

//variables used to store matches of filter settings from the books object
const matches = books;

//variable used to as page of the book
let page = 1;

/**
 * error checking or validation code.
 * it checks whether certain conditions are met and throws an error if those conditions are not satisfied.
 * these checks ensure that both books and page are defined
 *  
 */
if (!books && !Array.isArray(books)) {
  throw new Error("Source required");
}
if (!page && page.length < 2) {
  throw new Error("Range must be an array with two numbers");
}

/* An object used to store color settings for two different themes: "day" and "night."*/
const theme = {
  day: {
    dark: "10, 10, 20",
    light: "255, 255, 255",
  },

  night: {
    dark: "255, 255, 255",
    light: "10, 10, 20",
  },
};

/* THEME DISPLAY*/
// Get references to the theme settings and save button elements
const themeSettings = document.querySelector("[data-settings-theme]");
const themeSaveButton = document.querySelector(
  "body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary"
);
// Add a click event listener to the save button
themeSaveButton.addEventListener("click", (event) => {
  event.preventDefault();
  // Get the selected theme value
  const selectedTheme = themeSettings.value;
 
   // Apply the selected theme's colors to the body
   if (selectedTheme === "day") {
    document.body.style.setProperty("--color-dark", theme.day.dark);
    document.body.style.setProperty("--color-light", theme.day.light);
  } else if (selectedTheme === "night") {
    document.body.style.setProperty("--color-dark", theme.night.dark);
    document.body.style.setProperty("--color-light", theme.night.light);
  }
// Save the selected theme in local storage
   localStorage.setItem("selectedTheme", selectedTheme);
  // Hide the settings overlay
  document.querySelector("[data-settings-overlay]").style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("selectedTheme");

  if (savedTheme) {
    // Apply the saved theme's colors to the body
    if (savedTheme === "day") {
      document.body.style.setProperty("--color-dark", theme.day.dark);
      document.body.style.setProperty("--color-light", theme.day.light);
    } else if (savedTheme === "night") {
      document.body.style.setProperty("--color-dark", theme.night.dark);
      document.body.style.setProperty("--color-light", theme.night.light);
    }

    // Set the selected theme in your theme settings dropdown
    themeSettings.value = savedTheme;
  }
});


/*BOOKS TO BE DISPLAYED*/
/**
 * Function to create a book preview element based on the provided book object.
 * @param {object} book - The book object with book properties.
 * @returns {HTMLElement} - The created book preview element.
 */
function createBookPreviewElement(book) {
    const preview = document.createElement("dl");
    preview.className = "preview";
    preview.dataset.id = book.id;
    preview.dataset.title = book.title;
    preview.dataset.image = book.image;
    preview.dataset.subtitle = `${authors[book.author]} (${new Date(
      book.published
    ).getFullYear()})`;
    preview.dataset.description = book.description;
    preview.dataset.genre = book.genres;
    preview.innerHTML = /*html*/ `
      <div>
        <image class='preview__image' src="${book.image}" alt="book pic"/>
      </div>
      <div class='preview__info'>
        <dt class='preview__title'>${book.title}</dt>
        <dt class='preview__author'> By ${authors[book.author]}</dt>
      </div>`;
    return preview;
  }
  
  /**
   * Function to display a list of book previews within a specified range.
   * @param {HTMLElement} container - The container element to append book previews to.
   * @param {number} startIndex - The starting index of the books to display.
   * @param {number} endIndex - The ending index of the books to display.
   */
  function displayBookPreviews(container, startIndex, endIndex) {
    const fragment = document.createDocumentFragment();
    for (let i = startIndex; i < endIndex; i++) {
      const bookPreview = createBookPreviewElement(books[i]);
      fragment.appendChild(bookPreview);
    }
    container.innerHTML = ''; // Clear the container before appending
    container.appendChild(fragment);
  }
  
  // Variables for displaying books
  const bookListContainer = document.querySelector("[data-list-items]");
  let startIndex = 0;
  let endIndex = 36;
  
  // Display the initial set of book previews
  displayBookPreviews(bookListContainer, startIndex, endIndex);
  


/**
 * SEARCH BUTTON
 * sets up functionality for showing and hiding a search overlay when certain elements on a web page are clicked.
 */
//Get references to HTML elements using their data attributes
const searchButton = document.querySelector("[data-header-search]");
const searchOverlay = document.querySelector("[data-search-overlay]");
const searchCancelButton = document.querySelector("[data-search-cancel]");
// Add a click event listener to show the search overlay
searchButton.addEventListener("click", () => {
// When the search button is clicked, display the search overlay
  searchOverlay.style.display = "block";
});
// Add a click event listener to hide the search overlay
 searchCancelButton.addEventListener("click", () => {
   // When the cancel button within the search overlay is clicked, hide the overlay
  searchOverlay.style.display = "none";
});


/**
 * SETTINGS
 *  handles the behavior of the settings button and settings cancel button
 */
//references to the settings button
const settingsButton = document.querySelector("[data-header-settings]");
const settingsOverlay = document.querySelector("[data-settings-overlay]");
const settingsCancelButton = document.querySelector("[data-settings-cancel]");
// Add a click event listener to the settings button
settingsButton.addEventListener("click", () => {
// When the settings button is clicked, display the settings overlay
  settingsOverlay.style.display = "block";
});
// Add a click event listener to the settings cancel button
settingsCancelButton.addEventListener("click", () => {
 // When the settings cancel button is clicked, hide the settings overlay 
  settingsOverlay.style.display = "none";
});


/**
 * function that displays the search options of all genres and all the authors
 * @param {HTMLSelectElement} selectElement = This parameter is  a reference to an HTML <select> element.
 * @param {object} data =  object that contains data used to load the options within the <select> element.
 */
function selectDropdown(selectElement, data) {
  // Loop through the data object and create options
  for (const key in data) {
     // Create a new <option> element
    const optionElement = document.createElement("option");
    // Set the option's value to the current data key
    optionElement.value = key;
    // Set the text content of the option to the corresponding data value
    optionElement.textContent = data[key];
    selectElement.appendChild(optionElement);
  }
}

// Get references to the author and genre dropdowns
const authorSelect = document.querySelector("[data-search-authors]");
const genreSelect = document.querySelector("[data-search-genres]");

// loads the author and genre dropdowns using the selectDropdown function
selectDropdown(authorSelect, authors);
selectDropdown(genreSelect, genres);



// Define references to the necessary HTML elements
const overlay = document.querySelector("[data-list-active]");
const title = document.querySelector("[data-list-title]");
const subtitle = document.querySelector("[data-list-subtitle]");
const description = document.querySelector("[data-list-description]");
const image = document.querySelector("[data-list-image]");
const imageBlur = document.querySelector("[data-list-blur]");
/**
 * Function to toggle the display of book details when a book preview is clicked
 * and hide them when the close button is clicked.
 * @param {HTMLElement} clickedElement - The clicked element .
 * @param {HTMLElement} detailsOverlay - The element for displaying book details.
 * @param {HTMLElement} titleElement - The element to display the book's title.
 * @param {HTMLElement} subtitleElement - The element to display the book's subtitle.
 * @param {HTMLElement} descriptionElement - The element to display the book's description.
 * @param {HTMLElement} imageElement - The image element to set the source attribute.
 * @param {HTMLElement} imageBlurElement - The blurred image element to set the source attribute.
 */
function toggleBookDetails(
    clickedElement,
    detailsOverlay,
    titleElement,
    subtitleElement,
    descriptionElement,
    imageElement,
    imageBlurElement
  ) {
    // Check if the clicked element has specific dataset attributes
    if (clickedElement.dataset.id) {
      // Display the book details overlay
      detailsOverlay.style.display = "block";
    }
  
    // Check if the clicked element has a dataset description attribute
    if (clickedElement.dataset.description) {
      // Set the description text to the clicked book's description
      descriptionElement.innerHTML = clickedElement.dataset.description;
    }
  
    // Check if the clicked element has a dataset subtitle attribute
    if (clickedElement.dataset.subtitle) {
      // Set the subtitle text to the clicked book's subtitle
      subtitleElement.innerHTML = clickedElement.dataset.subtitle;
    }
  
    // Check if the clicked element has a dataset title attribute
    if (clickedElement.dataset.title) {
      // Set the title text to the clicked book's title
      titleElement.innerHTML = clickedElement.dataset.title;
    }
  
    // Check if the clicked element has a dataset image attribute
    if (clickedElement.dataset.image) {
      // Set the image source to the clicked book's image
      imageElement.setAttribute("src", clickedElement.dataset.image);
      imageBlurElement.setAttribute("src", clickedElement.dataset.image);
    }
  }
  
  // Close button for hiding book details
  const close = document.querySelector("[data-list-close]");
  close.addEventListener("click", () => {
    document.querySelector("[data-list-active]").style.display = "none";
  });
  
  // Show button for displaying book details
  const show = document.querySelector("[data-list-items]");
  show.addEventListener("click", (event) => {
    // Call the toggleBookDetails function with the appropriate parameters
    toggleBookDetails(
      event.target,
      overlay,
      title,
      subtitle,
      description,
      image,
      imageBlur
    );
  });
  


/*SHOW MORE BUTTON*/
// Get a reference to the "Show More" button
const showMoreButton = document.querySelector("[data-list-button]");
// Initialize startIndex and endIndex
 startIndex = 0;
 endIndex += 36; // You can adjust this number to control how many books are initially displayed

// Add a click event listener to the "Show More" button
showMoreButton.addEventListener("click", () => {
  // Increment the startIndex and endIndex to load the next batch of books
  startIndex = endIndex;
  endIndex += 36; // Load the next 36 books; you can adjust this number

  // Ensure endIndex does not exceed the total number of books
  if (endIndex > books.length) {
    endIndex = books.length;
    showMoreButton.style.display = "none"; // Hide the button when all books are loaded
  }

  const extracted = books.slice(startIndex, endIndex);

  // Create a document fragment to efficiently append elements
  const fragment = document.createDocumentFragment();

  // Loop through the extracted books and create preview elements for the next batch
  for (const book of extracted) {
    const preview = document.createElement("dl");
    preview.className = "preview";
    // Set dataset attributes for book information
    preview.dataset.id = book.id;
    preview.dataset.title = book.title;
    preview.dataset.image = book.image;
    preview.dataset.subtitle = `${authors[book.author]} (${new Date(
      book.published
    ).getFullYear()})`;
    preview.dataset.description = book.description;
    // Create HTML structure for each book preview
    preview.innerHTML = `
       <div>
         <img class='preview__image' src="${book.image}" alt="book pic"/>
       </div>
       <div class='preview__info'>
         <dt class='preview__title'>${book.title}</dt>
         <dt class='preview__author'> By ${authors[book.author]}</dt>
       </div>
     `;

    fragment.appendChild(preview);
  }
  // Get a reference to the element that will contain the book previews
  const booklist1 = document.querySelector("[data-list-items]");
  booklist1.appendChild(fragment);
});

// Set the initial text for the "Show More" button
showMoreButton.textContent = "Show More";


/**
 * Function to filter books based on user-selected filters
 * @param {object[]} books - The array of books to filter.
 * @param {object} filters - The filters object containing user-selected filters.
 * @returns {object[]} - An array of filtered books.
 */
function filterBooks(books, filters) {
    return books.filter((book) => {
      const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
      const authorMatch = filters.author === 'any' || book.author === filters.author;
      const genreMatch = filters.genre === 'any' || book.genres.includes(filters.genre);
  
      return titleMatch && authorMatch && genreMatch;
    });
  }
  
  /**
   * Function to display a list of books.
   * @param {object[]} books - The array of books to display.
   */
  function displayBooks(books) {
    const fragment = document.createDocumentFragment();
  
    for (const book of books) {
      const bookPreview = createBookPreview(book);
      fragment.appendChild(bookPreview);
    }
  
    const bookList = document.querySelector("[data-list-items]");
    bookList.innerHTML = ''; // Clear existing content
    bookList.appendChild(fragment);
  }
  
  /**
   * Function to handle filtering and displaying books based on user-selected filters.
   */
  function handleFiltering() {
    const formData = new FormData(document.querySelector("[data-search-form]"));
    const filters = Object.fromEntries(formData);
  
    const filteredBooks = filterBooks(matches, filters);
    displayBooks(filteredBooks);
  }
  
  // Add event listener to the search form to trigger filtering
  const searchForm = document.querySelector("[data-search-form]");
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleFiltering();
  });
  
  // Initialize the book list with all books
  displayBooks(matches);
  





