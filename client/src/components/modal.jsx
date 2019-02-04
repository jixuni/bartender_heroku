import React, { Component } from "react";

class Modal extends Component {
  render() {
    const { show, onClose, message, onUnderAge } = this.props;
    const showHideClassName = show
      ? "modal display-block"
      : "modal display-none";
    return (
      <div className={showHideClassName}>
        <div
          className="modal-dialog modal-dialog-centered text-center"
          //   role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title mx-auto" id="exampleModalLongTitle">
                Are you over the age of 21?
              </h5>
            </div>
            <div className="modal-body text-danger">{message}</div>
            <div className="modal-footer mx-auto">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onClose()}
              >
                I'm Over 21
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onUnderAge()}
              >
                I'm Under 21
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
