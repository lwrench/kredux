export default function createStore(reducer) {
  let currentState = null;
  let currentListeners = [];

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    console.log(111);
    currentState = reducer(currentState, action);
    currentListeners.forEach((listener) => listener());
    console.log(222);
  }

  function subscribe(listener) {
    currentListeners.push(listener);
  }

  dispatch({type: "init"})

  return {
    getState,
    dispatch,
    subscribe,
  };
}
