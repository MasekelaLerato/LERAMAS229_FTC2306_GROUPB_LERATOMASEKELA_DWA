const MAX_NUMBER = 15;
const MIN_NUMBER = -5;

const number = document.querySelector('[data-key="number"]');
const subtract = document.querySelector('[data-key="subtract"]');
const add = document.querySelector('[data-key="add"]');
const container = document.querySelector('[data-key="alert-duration"]');
const resetButton = document.querySelector('#resetButton');
const resetAlert = document.querySelector('#resetAlert');

// Action Types
const ADD = 'ADD';
const SUBTRACT = 'SUBTRACT';
const RESET = 'RESET';

// Reducer function to manage state changes
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

// Function to create a Redux-inspired store
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
const store = createStore(numberReducer);

// Function to log state changes to the console
const logStateChange = () => {
  const newState = store.getState();
  console.log('State changed:', newState);
};

// Subscribe to store changes and log the new state to the console
store.subscribe(logStateChange);

// Event handler for subtract button
const subtractHandler = () => {
  // Dispatch a SUBTRACT action when the button is clicked
  store.dispatch({ type: SUBTRACT });
  console.log('Subtract was clicked');
};

// Event handler for add button
const addHandler = () => {
  // Dispatch an ADD action when the button is clicked
  store.dispatch({ type: ADD });
  console.log('Add was clicked');
};

// Event handler for reset button
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
