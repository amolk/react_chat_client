import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Messages from './Messages'
import MessageInput from './MessageInput'

import { FileDrop } from 'react-file-drop';
import { addFileUpload } from '../actions'

class App extends Component{
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  render(){
    const { messages } = this.props
    return (
      <FileDrop onDrop={this.onDrop}>
      <Container fluid className="">
        <Row className="">
          <Col></Col>
          <Col className="flex-column vh-100" style={{flex: "0 0 400px"}}>
            <div className="chat-panel">
              <h1 className="contact-profile">Ask Bertrand</h1>
              <Messages messages={messages} />
              <MessageInput />
            </div>
          </Col>
        </Row>
      </Container>
      </FileDrop>
    )
  }

  onDrop(files, event) {
    this.props.dispatch(addFileUpload(files[0]))
  }

}

const mapStateToProps= state =>({
  messages: state.messages
})

export default connect(mapStateToProps)(App);
