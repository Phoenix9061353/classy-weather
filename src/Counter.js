import React from 'react';

//Class組件都要 extends React.Component
class Counter extends React.Component {
  //Class組件要使用 state或 event handler時，就必須要有constructor
  constructor(props) {
    super(props);

    this.state = {
      count: 5,
    };

    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  //用 Class methods制定 event handler，並且要回到 constructor來綁「this」
  handleDecrement() {
    this.setState((curState) => {
      return {
        count: curState.count - 1,
      };
    });
  }
  handleIncrement() {
    this.setState((curState) => {
      return {
        count: curState.count + 1,
      };
    });
  }

  //render → 類似於function組件裡的function本身，但基本不會包含太多的render邏輯，而是只用來回傳一些JSX
  render() {
    return (
      <div>
        <button onClick={this.handleDecrement}>-</button>
        <span>{this.state.count}</span>
        <button onClick={this.handleIncrement}>+</button>
      </div>
    );
  }
}

export default Counter;
