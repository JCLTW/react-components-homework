import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';
import { ROLE } from '../constants';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  getAutoReplyMessage = (message) => {
    return answersData.find((answer) => answer.tags.indexOf(message) > -1);
  };

  handleSendMessages = (message) => {
    let { messages } = this.state;
    const messageDto = { text: message, role: ROLE.CUSTOMER };
    messages = messages.concat(messageDto);

    const replyMessageDto = this.getAutoReplyMessage(message);
    if (replyMessageDto) messages = messages.concat(replyMessageDto);

    this.setState({ messages });
  };

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput onSendMessages={this.handleSendMessages} />
      </main>
    );
  }
}

export default Chat;
