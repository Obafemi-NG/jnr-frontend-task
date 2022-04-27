import React, { Fragment, PureComponent } from "react";
import ReactDOM from "react-dom";
import { toggleCurrencyDropdown } from "../../redux/currency/currency.action";
import styles from "./currency-modal.module.css";
import { connect } from "react-redux";

class Backdrop extends PureComponent {
  render() {
    const { onclose } = this.props;
    return <div className={styles.backdrop} onClick={onclose} />;
  }
}

class CurrencyModalOverlay extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className={styles["currency-modal-overlay"]}>
        <div className={styles.children}>{children}</div>
      </div>
    );
  }
}

const overlayElement = document.getElementById("overlay");

class CurrencyModal extends PureComponent {
  render() {
    const { toggleCurrency, children } = this.props;

    return (
      <Fragment>
        {ReactDOM.createPortal(
          <Backdrop onclose={toggleCurrency} />,
          overlayElement
        )}
        {ReactDOM.createPortal(
          <CurrencyModalOverlay> {children} </CurrencyModalOverlay>,
          overlayElement
        )}
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleCurrency: () => dispatch(toggleCurrencyDropdown()),
});

export default connect(null, mapDispatchToProps)(CurrencyModal);
