import React, {Component} from 'react';
import Profile from './Profile'

class Counter extends Component {
  state = {
    number : 0
  };

  handleIncrease = () => {
    this.setState({
      number : this.state.number + 1
    });
  }

  handleDecrease = () => {
    this.setState({
      number: this.state.number - 1
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.number}</h2>
        <button onClick={this.handleIncrease}>+1</button>
        <button onClick={this.handleDecrease}>-1</button>
        <Profile username="tintoll" name="화니" />
      </div>
    )
  }
}

export default Counter;