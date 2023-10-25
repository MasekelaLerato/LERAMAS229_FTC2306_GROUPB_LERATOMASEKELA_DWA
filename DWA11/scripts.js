const MAX_NUMBER = 15;
const MIN_NUMBER = -5;

const number = document.querySelector('[data-key="number"]');
const subtract = document.querySelector('[data-key="subtract"]');
const add = document.querySelector('[data-key="add"]');
const container = document.querySelector('[data-key="alert-duration"]');
const resetButton = document.querySelector('#resetButton');
const resetAlert = document.querySelector('#resetAlert');

// Action Types
//  These are labels used to indicate the type of action that needs to be performed.
const ADD = 'ADD';
const SUBTRACT = 'SUBTRACT';
const RESET = 'RESET';

/**
 * Reducer function to manage state changes for a counting app.
 *it increments or decrements the state or resets it based on the action type.
 * 
 * @param {number} state - The current state, representing the count.
 * @param {object} action - An action object describing the change to apply.
 * @param {string} action.type - The type of action to perform (ADD, SUBTRACT, RESET).
 * @returns {number} - The new state after applying the action.
 */
const numberReducer = (state = 0, action) => {
  switch (action.type) {
    case ADD:
      return state + 1;
    case SUBTRACT:
      return state - 1;
    case RESET:
      return 0;
    default:
      return state;
  }
};

// Function to create a Redux-inspired store. . The store manages application state. It contains a current state, a way to dispatch actions to update the state, and a mechanism to subscribe to state changes. The store is initialized with an empty action, setting the initial state.
/**
 * 
 * @param {function} reducer  - A reducer function that manages state changes.
 * @returns {object} - A Redux-inspired store with methods to get, dispatch, and subscribe to state changes.
 */
const createStore = (reducer) => {
  let state;
  let listeners = [];

  // Get the current state
  const getState = () => state;

  // Dispatch an action to update the state
  const dispatch = (action) => {
    state = reducer(state, action);
    // Notify all listeners that the state has changed
    listeners.forEach(listener => listener());
  };

  // Subscribe a listener to state changes and return a function to unsubscribe
  const subscribe = (listener) => {
    listeners.push(listener);
    // Log the new state to the console whenever it changes
    const unsubscribe = () => {
      listeners = listeners.filter(l => l !== listener);
    };
    return unsubscribe;
  };

  // Initialize the state by dispatching an empty action
  dispatch({});

  return { getState, dispatch, subscribe };
};

// Create a store using the numberReducer
// This line creates a store using the createStore function and the numberReducer
//This store is responsible for managing the state of your counting app.
const store = createStore(numberReducer);

// Function to log state changes to the console

const logStateChange = () => {
  const newState = store.getState();
  console.log('State changed:', newState);
};

// Subscribe to store changes and log the new state to the console
store.subscribe(logStateChange);

// Event handler for subtract button
//It dispatches a SUBTRACT action to the store, indicating that the state should be decremented, and it logs a message to the console.
const subtractHandler = () => {
  // Dispatch a SUBTRACT action when the button is clicked
  store.dispatch({ type: SUBTRACT });
  console.log('Subtract was clicked');
};

// Event handler for add button
//It dispatches an ADD action to the store, indicating that the state should be incremented, and it logs a message to the console.
const addHandler = () => {
  // Dispatch an ADD action when the button is clicked
  store.dispatch({ type: ADD });
  console.log('Add was clicked');
};

// Event handler for reset button
// It dispatches a RESET action, logs a message, and sets the resetAlert element to be displayed, showing an alert on the page.
const resetHandler = () => {
  // Dispatch a RESET action when the button is clicked
  store.dispatch({ type: RESET });
  console.log('Reset was clicked');
  resetAlert.style.display = 'block'; // Show the reset alert
};

// Attach event listeners to buttons and link them to the corresponding event handlers
subtract.addEventListener('click', subtractHandler);
add.addEventListener('click', addHandler);
resetButton.addEventListener('click', resetHandler);
