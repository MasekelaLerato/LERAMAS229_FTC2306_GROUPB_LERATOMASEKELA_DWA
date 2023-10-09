// Abstraction for Creating Book Previews
/**
 * Function to create a book preview element based on the provided book object.
 * @param {object} book - The book object with book properties.
 * @returns {HTMLElement} - The created book preview element.
 */
function createBookPreviewElement(book) {
    const preview = document.createElement("dl");
    preview.className = "preview";
    
    // Single Responsibility Principle (SRP): This function is responsible for creating book previews only.
    
    setBookAttributes(preview, book);
    createBookPreviewStructure(preview, book);
    return preview;
  }
  
  /**
   * Function to set dataset attributes for a book preview element.
   * @param {HTMLElement} preview - The book preview element.
   * @param {object} book - The book object with book properties.
   */
  function setBookAttributes(preview, book) {
    preview.dataset.id = book.id;
    preview.dataset.title = book.title;
    preview.dataset.image = book.image;
    preview.dataset.subtitle = `${authors[book.author]} (${new Date(
      book.published
    ).getFullYear()})`;
    preview.dataset.description = book.description;
    preview.dataset.genre = book.genres;
    
    // SRP: This function is responsible for setting dataset attributes only.
  }
  
  /**
   * Function to create the HTML structure of a book preview element.
   * @param {HTMLElement} preview - The book preview element.
   * @param {object} book - The book object with book properties.
   */
  function createBookPreviewStructure(preview, book) {
    const imageContainer = document.createElement("div");
    imageContainer.innerHTML = `<image class='preview__image' src="${book.image}" alt="book pic"/>`;
  
    const infoContainer = document.createElement("div");
    infoContainer.innerHTML = `
      <dt class='preview__title'>${book.title}</dt>
      <dt class='preview__author'> By ${authors[book.author]}</dt>`;
      
    preview.appendChild(imageContainer);
    preview.appendChild(infoContainer);
    
    // SRP: This function is responsible for creating the HTML structure of a book preview only.
  }
  
  // Abstraction for Displaying Book Previews
  /**
   * Function to display a list of book previews within a specified range.
   * @param {HTMLElement} container - The container element to append book previews to.
   * @param {number} startIndex - The starting index of the books to display.
   * @param {number} endIndex - The ending index of the books to display.
   * @param {object[]} books - An array of book objects.
   */
  function displayBookPreviews(container, startIndex, endIndex, books) {
    const fragment = document.createDocumentFragment();
    for (let i = startIndex; i < endIndex; i++) {
      const bookPreview = createBookPreviewElement(books[i]);
      fragment.appendChild(bookPreview);
    }
    container.innerHTML = ''; // Clear the container before appending
    container.appendChild(fragment);
    
    // Open-Closed Principle (OCP): The function can be extended to display different types of previews without modification.
  }
  
  // Abstraction for Toggling Book Details
  /**
   * Function to toggle the display of book details when a book preview is clicked
   * and hide them when the close button is clicked.
   * @param {HTMLElement} clickedElement - The clicked element.
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
    
    // SRP: This function is responsible for toggling book details display only.
    
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
  


  