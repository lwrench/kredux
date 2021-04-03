export default function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }
  let currentState;
  let currentListeners = [];

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = reducer(currentState, action);
    currentListeners.forEach((listener) => listener());
  }

  function subscribe(listener) {
    currentListeners.push(listener);

    return () => {
      currentListeners.filter(now => (now === listener))
    }
  }

  dispatch({type: "init"})

  return {
    getState,
    dispatch,
    subscribe,
  };
}
