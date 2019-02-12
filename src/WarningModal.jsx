import React, { Component } from 'react';
import Modal from './Modal';
import './WarningModal.css';

class WarningModal extends Component {
  render() {
    return (
      <Modal className="modal">
        <div className="modal-body">
          <h1>Warning: You will be logged out due to inactivity.</h1>
          <button onClick={this.props.handleClick}>I'm still here!</button>
        </div>
      </Modal>
    );
  }
}

export default WarningModal;
