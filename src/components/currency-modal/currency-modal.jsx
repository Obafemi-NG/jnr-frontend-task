import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import styles from "./currency-modal.module.css";

class CurrencyModalOverlay extends React.Component {
  render() {
    const { children } = this.props;
    return <div className={styles["currency-modal-overlay"]}>{children}</div>;
  }
}

const overlayElement = document.getElementById("overlay");

class CurrencyModal extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <Fragment>
        {ReactDOM.createPortal(
          <CurrencyModalOverlay> {children} </CurrencyModalOverlay>,
          overlayElement
        )}
      </Fragment>
    );
  }
}

export default CurrencyModal;
