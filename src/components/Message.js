import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Image from 'react-bootstrap/Image';

class Message extends Component{
  render(){
    const { id, text, type, metadata } = this.props.message
    console.log(this.props)
    let class_name = 'replies'
    if(type == 'bot')
      class_name = 'sent'

    return (
      <li key={id}>
        <div className={class_name}>
          <img className='avatar' src='/gotitlogo.png' />
          <div className="bubble">
            {text}
            {metadata?.full_response ? this.renderFullResponse(metadata.full_response) : null}
            {metadata?.local_url ? this.renderImageFile(metadata.local_url) : null}
          </div>
        </div>
      </li>
    )
  }

  renderRow(row, index) {
    return (
      <tr key={index}>
        {row.cells.map((cell, cell_index) => <td key={cell_index}>{cell.text}</td>)}
      </tr>
    )
  }
  renderTable(table_data){
    return (
      <table>
        <tbody>
          {table_data.rows.map((row, index) => {
            return this.renderRow(row, index)
          })}
        </tbody>
      </table>
    )
  }
  renderFullResponse(full_response){
    try {
      const table_data = full_response.fulfillment.data.google.richResponse.items[1].tableCard
      return this.renderTable(table_data)
    }
    catch {
      return null
    }

  }

  renderImageFile(file_url) {
    return (
      <div>
        <Image className="upload-image" src={file_url} fluid />
      </div>
    )
  }
}

export default connect()(Message);
