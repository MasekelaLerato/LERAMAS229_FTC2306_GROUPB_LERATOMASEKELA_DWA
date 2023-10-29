import { html, css, LitElement } from 'lit'; // Import necessary modules from Lit.

const MAX_NUMBER = 15; // Define the maximum allowed counter value.
const MIN_NUMBER = -5; // Define the minimum allowed counter value.

class TallyApp extends LitElement {
  static styles = css`
    /* Define your CSS styles here (if needed) */
  `;

  static properties = {
    counterValue: { type: Number }, // Define the property for the current counter value.
    isMinimumReached: { type: Boolean }, // Define the property to track if the minimum is reached.
    isMaximumReached: { type: Boolean }, // Define the property to track if the maximum is reached.
  };

  constructor() {
    super(); // Call the constructor of the parent class.

    this.counterValue = 0; // Initialize the counter value to 0.
    this.isMinimumReached = false; // Initialize the minimum reached state as false.
    this.isMaximumReached = false; // Initialize the maximum reached state as false.
  }

  subtractHandler() {
    const newValue = this.counterValue - 1; // Decrement the counter value.
    this.counterValue = newValue; // Update the counter value.

    if (this.isMaximumReached) {
      this.isMaximumReached = false; // Reset the maximum reached state if previously reached.
    }

    if (newValue <= MIN_NUMBER) {
      this.isMinimumReached = true; // Set the minimum reached state if the new value is at or below the minimum.
    }
  }

  addHandler() {
    const newValue = this.counterValue + 1; // Increment the counter value.
    this.counterValue = newValue; // Update the counter value.

    if (this.isMinimumReached) {
      this.isMinimumReached = false; // Reset the minimum reached state if previously reached.
    }

    if (newValue >= MAX_NUMBER) {
      this.isMaximumReached = true; // Set the maximum reached state if the new value is at or above the maximum.
    }
  }

  resetHandler() {
    this.counterValue = 0; // Reset the counter value to 0.
    this.isMinimumReached = false; // Reset the minimum reached state.
    this.isMaximumReached = false; // Reset the maximum reached state.
  }

  render() {
    return html`
      <!-- Render the HTML structure using Lit's html template literal syntax -->
      <input
        class="counter_value"
        data-key="number"
        value="${this.counterValue}" // Bind the input value to the counterValue property.
      />
      <div class="counter_actions">
        <button
          data-key="subtract"
          class="counter_button counter_button_first"
          @click="${this.subtractHandler}" // Add a click event handler for the subtract button.
          ?disabled="${this.isMinimumReached}" // Disable the button if the minimum is reached.
        >
          -
        </button>
        <button
          data-key="add"
          class="counter_button"
          @click="${this.addHandler}" // Add a click event handler for the add button.
          ?disabled="${this.isMaximumReached}" // Disable the button if the maximum is reached.
        >
          +
        </button>
      </div>
      <div data-key="alert-duration">
        <button id="resetButton" @click="${this.resetHandler}">Reset</button> // Add a click event handler for the reset button.
        <p id="resetAlert" ?hidden="${!this.isMaximumReached && !this.isMinimumReached}">
          ${this.isMaximumReached
            ? "Maximum Reached!"
            : this.isMinimumReached
            ? "Minimum Reached!"
            : ""} // Display the appropriate message based on the reached states.
        </p>
      </div>
    `;
  }
}

customElements.define('tally-app', TallyApp); // Define the custom 'tally-app' element using Lit.

