const appleMiddleware = (...middlewares) => {
  // 为什么返回双箭头函数可以查看createStore中enhance的实现方式
  return createStore => reducer => {
    const store = createStore(reducer)
    let dispatch = store.dispatch

    const midApi = {
      getState: store.getState,
      // 不同的中间件触发dispatch会导致混乱，所以采用箭头函数包裹
      dispatch: (action, ...args) => (dispatch(action, ...args))
    }
    // 中间件在运行的时候会需要getState和dispatch，通过这种方式以参数的方式传入
    const middlewareChain = middlewares.map(middleware => middleware(midApi))
    // 依此执行中间件以达到修改原生dispatch的作用，并返回新的dispatch
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