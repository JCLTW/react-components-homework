import React, { Component } from 'react';
import './ChatInput.scss';

const ENTER_KEY_CODE = 13;
class ChatInput extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      message: '',
    };
  }

  handleChange = (event) => {
    this.setState({ message: event.target.value });
  };

  handleKeyUp = (event) => {
    if (this.state.message !== '' && event.keyCode === ENTER_KEY_CODE) {
      this.props.onSendMessages(this.state.message);
      this.setState({ message: '' });
    }
  };

  handleClick = () => {
    if (this.state.message !== '') {
      this.props.onSendMessages(this.state.message);
      this.setState({ message: '' });
    }
  };

  render() {
    return (
      <footer className="ChatInput">
        <input
          type="text"
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          value={this.state.message}
        />
        <button type="button" onClick={this.handleClick}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
