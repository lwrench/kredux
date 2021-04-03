import React, { Component } from "react";
// import {connect} from "react-redux";
// import {bindActionCreators} from "redux";
import { connect, bindActionCreators } from "../kreactredux";

// @connect(
//   // mapStateToProps
//   ({count}) => ({count}),
//   // mapDispatchToProps object | function
//   {
//     add: () => ({type: "ADD"})
//   }
//   // dispatch => {
//   //   let creators = {
//   //     add: () => ({type: "ADD"}),
//   //     minus: () => ({type: "MINUS"})
//   //   };
//   //   creators = bindActionCreators(creators, dispatch);

//   //   return {
//   //     dispatch,
//   //     ...creators
//   //   };
//   // }
// )
class ReactReduxPage extends Component {
  render() {
    const { count, dispatch, add } = this.props;
    console.log("pr", this.props); //sy-log
    return (
      <div>
        <h3>ReactReduxPage</h3>
        <p>{count}</p>
        <button onClick={() => dispatch({ type: "ADD", payload: 100 })}>
          dispatch add
        </button>
        <button onClick={add}>add</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state,
  };
};

const mapDispatchToProps = () => {
  return (dispatch) => {
    let creators = {
      add: () => ({ type: "ADD", payload: 100 }),
      minus: () => ({ type: "MINUS", payload: 100 }),
    };
    creators = bindActionCreators(creators, dispatch);

    return {
      dispatch,
      ...creators,
    };
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactReduxPage);
