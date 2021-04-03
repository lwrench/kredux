import { createStore, appleMiddleware } from "../kredux";
// import thunk from 'redux-thunk'
// import logger from 'redux-logger'

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

function logger({ getState }) {
  // next是上一次聚合的函数
  return next => action => {
    console.log('-----------logger-----------')
    console.log('action:' + action.type + '执行了')
    let prevState = getState()
    console.log('prev state', prevState);
    const returnValue = next(action)
    let nextState = getState()
    console.log('next state', nextState);
    console.log('-----------logger-----------')
    return returnValue
  }
}

function thunk({ getState, dispatch }) {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }
    return next(action)
  }
}
