import React, { Component } from 'react'
import store from "../store"

export class ReduxPage extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    })
  }
  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }
  add = () => {
    store.dispatch({type: "ADD", payload: 100})
  }
  
  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <div>{store.getState()}</div>
        <button onClick={this.add}>add</button>
      </div>
    )
  }
}

export default ReduxPage
