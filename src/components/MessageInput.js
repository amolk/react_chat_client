import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { FileDrop } from 'react-file-drop';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import { addUserMessage, addFileUpload } from '../actions'

class MessageInput extends Component{
  constructor(props) {
    super(props);
    this.state = {value: ''}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  render(){
    // const { id, text, user_message } = this.props
    return (
      <FileDrop onDrop={this.onDrop}>

      <form onSubmit={this.handleSubmit}>
        <div className="message-input">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Type your message or drop file here"
              aria-label="Type your message or drop file here"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" type="submit">
                <i className="fa fa-paper-plane" aria-hidden="true"></i>
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </form>

      </FileDrop>
    )
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.dispatch(addUserMessage(this.state.value))
    this.setState({value: ''})
  }

  onDrop(files, event) {
    this.props.dispatch(addFileUpload(files[0]))
  }
}

export default connect()(MessageInput);
