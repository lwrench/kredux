import React, { Component } from "react";
import store from "../store";

export class ReduxPage extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
  add = () => {
    store.dispatch({ type: "ADD", payload: 100 });
  };
  asyAdd = () => {
    store.dispatch((dispatch, getState) => {
      setTimeout(() => {
        dispatch({ type: "ADD", payload: 100 });
        console.log("getState", getState()); //sy-log
      }, 1000);
    });
  };
  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <div>{store.getState()}</div>
        <button onClick={this.add}>add</button>
        <button onClick={this.asyAdd}>asyAdd</button>
      </div>
    );
  }
}

export default ReduxPage;
