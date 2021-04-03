import { createStore, appleMiddleware } from "../kredux";
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const reducer = (state = 0, { type, payload }) => {
  switch (type) {
    case "ADD":
      return state + payload
    default:
      return state
  }
};

const store = createStore(reducer, appleMiddleware(thunk, logger));

export default store;
