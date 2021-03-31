## redux

### 基本用法
- 通过`createStore`创建`store`
- 在创建`store`时需传入纯函数`reducer`
- `reducer`接收两个参数：`state`和`action`
- 在需要用到redux的组件中引入`store`
- 编写改变状态的方法，通过`store.dispatch()`方法来派发`action`
- 被派发的`action`会转发给`reducer`，`reducer`会通过`action`来更新`state`
- 组件可以通过`store.getState()`方法来获取状态
- 通过`store.subscribe()`方法来订阅`state`的更新，每次状态改变都会触发回调事件

用到`redux`的组件
```js
import React, { Component } from 'react'
import store from "../store"

export class ReduxPage extends Component {
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate()
    })
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
```

创建`store`和`reducer`
```js
import { createStore } from "../kredux";

const reducer = (state = 0, { type, payload }) => {
  switch (type) {
    case "ADD":
      return state + payload
    default:
      return state
  }
};

const store = createStore(reducer);

export default store;
```