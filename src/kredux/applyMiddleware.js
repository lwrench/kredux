const appleMiddleware = (...middlewares) => {
  // 为什么返回双箭头函数可以查看createStore中enhance的实现方式
  return createStore => reducer => {
    const store = createStore(reducer)
    let dispatch = store.dispatch

    const midApi = {
      getState: store.getState,
      dispatch: (action, ...args) => (dispatch(action, ...args))
    }

    const middlewareChain = middlewares.map(middleware => middleware(midApi))

    dispatch = compose(...middlewareChain)(dispatch)

    return {
      ...store,
      dispatch,
    }
  }
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return args => args
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => (a(b(...args))))
}

export default appleMiddleware