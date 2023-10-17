// BookPreviewManager encapsulates functionality for creating, displaying, and toggling book previews.
const BookPreviewManager = {
    // Created a book preview element based on the provided book object.
    createBookPreviewElement: function (book) {
      const preview = document.createElement("book-preview");
  
      if (book) {
        preview.setAttribute("data-id", book.id);
        preview.setAttribute("data-title", book.title);
        preview.setAttribute("data-image", book.image);
  
        const author = authors[book.author];
        const publicationYear = new Date(book.published).getFullYear();
        preview.setAttribute(
          "data-subtitle",
          `${author} (${publicationYear})`
        );
        preview.setAttribute("data-description", book.description);
        preview.setAttribute("data-genres", book.genres.join(", "));
  
        const imageContainer = document.createElement("div");
        imageContainer.innerHTML = `<img class="preview__image" src="${book.image}" alt="book pic" />`;
  
        const infoContainer = document.createElement("div");
        infoContainer.innerHTML = `
          <dt class="preview__title">${book.title}</dt>
          <dt class="preview__author">By ${author}</dt>`;
  
        preview.appendChild(imageContainer);
        preview.appendChild(infoContainer);
      }
  
      return preview;
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
  
  // Define the List web component
  class ListComponent extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      // Implement the behavior for your List web component
      // Use your existing logic for the list component here
    }
  }
  
  customElements.define('list-component', ListComponent);
  
  // Define the Overlay web component
  class OverlayComponent extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      // Implement the behavior for your Overlay web component
      // Use your existing logic for the overlay component here
    }
  }
  
  customElements.define('overlay-component', OverlayComponent);
  
  // Define the BookPreview web component
  class BookPreviewComponent extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      // Implement the behavior for your BookPreview web component
      // Use your existing logic for the book preview component here
    }
  }
  
  customElements.define('book-preview', BookPreviewComponent);
  
/**BookPreviewManager Object: I've created a JavaScript object named BookPreviewManager to handle functions related to book previews, such as creating book preview elements and displaying book details.

createBookPreviewElement Function: This function is part of the BookPreviewManager object. It's responsible for creating a book preview element based on the provided book object. It sets the necessary attributes for the preview component, like title, author, description, genres, etc.

displayBookPreviews Function: Another function in BookPreviewManager, this one is responsible for displaying a list of book previews within a specified range. It accepts a container element, the start and end indices, and the list of books to display. It clears the container and appends the book preview elements to it.

toggleBookDetails Function: This function handles the toggling of book details when a book preview is clicked. It shows the details overlay, fills in the details from the clicked book preview, and displays the book's image.

List, Overlay, and BookPreview Components: These are web components defined using the class syntax. You can think of each component as a self-contained module with its own behavior and rendering logic.

List Component: Represents the main list of book previews.
Overlay Component: Represents the overlay for displaying book details.
BookPreview Component: Represents individual book previews.
connectedCallback Method: Within each component's connectedCallback method, you can implement the component's behavior. This is where you should put your existing logic related to each component.

Custom Elements: The customElements.define method is used to define these components, giving them custom HTML tags for use in your HTML markup. */