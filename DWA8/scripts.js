// To further improve the abstractions and create a more encapsulated design, I encapsulated related functionality within an object
//

/**
 * BookPreviewManager encapsulates functionality for creating, displaying, and toggling book previews.
 */
const BookPreviewManager = {
    // Create a book preview element based on the provided book object.
    createBookPreviewElement: function (book) {
      const preview = document.createElement("dl");
      preview.className = "preview";
      this.setBookAttributes(preview, book);
      this.createBookPreviewStructure(preview, book);
      return preview;
    },
  
    // Set dataset attributes for a book preview element.
    setBookAttributes: function (preview, book) {
      if (book) {
        preview.dataset.id = book.id;
        preview.dataset.title = book.title;
        preview.dataset.image = book.image;
        const author = author[book.author];
        const publicationYear = new Date(book.published).getFullYear();
        preview.dataset.subtitle = `${author} (${publicationYear})`;
        preview.dataset.description = book.description;
        preview.dataset.genres = book.genres.join(", ");
      }
    },
  
    // Create the HTML structure of a book preview element.
    createBookPreviewStructure: function (preview, book) {
      const imageContainer = document.createElement("div");
      imageContainer.innerHTML = `<img class="preview__image" src="${book.image}" alt="book pic" />`;
  
      const infoContainer = document.createElement("div");
      infoContainer.innerHTML = `
        <dt class="preview__title">${book.title}</dt>
        <dt class="preview__author">By ${authors[book.author]}</dt>`;
  
      preview.appendChild(imageContainer);
      preview.appendChild(infoContainer);
    },
  
    // Display a list of book previews within a specified range.
    displayBookPreviews: function (container, startIndex, endIndex, books) {
      if (container) {
        const fragment = document.createDocumentFragment();
  
        for (let i = startIndex; i < endIndex; i++) {
          const bookPreview = this.createBookPreviewElement(books[i]);
          fragment.appendChild(bookPreview);
        }
  
        container.innerHTML = ""; // Clear the container before appending
        container.appendChild(fragment);
      }
    },
  
    // Toggle the display of book details when a book preview is clicked and hide them when the close button is clicked.
    toggleBookDetails: function (clickedElement, detailsOverlay, elements) {
      if (clickedElement.dataset.id) {
        detailsOverlay.style.display = "block";
      }
  
      if (clickedElement.dataset.description) {
        elements.description.innerHTML = clickedElement.dataset.description;
      }
  
      if (clickedElement.dataset.subtitle) {
        elements.subtitle.innerHTML = clickedElement.dataset.subtitle;
      }
  
      if (clickedElement.dataset.title) {
        elements.title.innerHTML = clickedElement.dataset.title;
      }
  
      if (clickedElement.dataset.image) {
        elements.image.src = clickedElement.dataset.image;
        elements.imageBlur.src = clickedElement.dataset.image;
      }
    },
  };
  
  // Usage example:
  const container = document.getElementById("bookPreviewsContainer");
  const books = []; // An array of book objects
  const startIndex = 0;
  const endIndex = 35;
  
  // Display book previews
  BookPreviewManager.displayBookPreviews(container, startIndex, endIndex, books);