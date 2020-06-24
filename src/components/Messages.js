import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Message from './Message'

class Messages extends Component{
  render(){
    const { messages } = this.props
    return (
      <div className='messages' id='message-list'>
        <ul>
          {messages.map((message)=>
            <Message
              key={message.id}
              message={message}
            />)}
        </ul>
      </div>
    )
  }

  componentDidUpdate() {
    const messageList = document.getElementById('message-list');
    messageList.scrollTop = messageList.scrollHeight;
  }
}

const mapStateToProps= state =>({
  messages: state.messages
})

export default connect(mapStateToProps)(Messages);
