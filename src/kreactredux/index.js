import React, { useContext, useLayoutEffect, useReducer } from 'react'

const Context = React.createContext()

export const Provider = ({ store, children }) => {
  return <Context.Provider value={store}>{children}</Context.Provider>
}

export const connect = (
  mapStateToProps,
  mapDispatchToProps,
) => WrappedComponent => props => {
  const store = useContext(Context)
  const { getState, dispatch, subscribe } = store
  const stateProps = mapStateToProps(getState())
  // dispatch object | function
  let dispatchProps = { dispatch };
  if (typeof mapDispatchToProps === "function") {
    dispatchProps = mapDispatchToProps(dispatch);
  } else if (typeof mapDispatchToProps === "object") {
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
  }

  // 函数组件的forceUpdate
  const [, forceUpdate] = useReducer(x => x + 1, 0)

  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      forceUpdate()
    })
    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [store])
  return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args))
}

export const bindActionCreators = (creators, dispatch) => {
  const obj = {}
  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch)
  }
}
