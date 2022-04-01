import React from "react";
import { Fragment } from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

import { toggleCart } from "../../redux/cart/cart.action";

import styles from "./modal.module.css";

const Backdrop = ({ onclick }) => {
  return <div className={styles.backdrop} onClick={onclick} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles.cart}> {props.children} </div>
    </div>
  );
};

const overlayElement = document.getElementById("overlay");

class Modal extends React.Component {
  render() {
    const { toggleCart, children } = this.props;
    return (
      <Fragment>
        {ReactDOM.createPortal(
          <Backdrop onclick={toggleCart} />,
          overlayElement
        )}
        {ReactDOM.createPortal(
          <ModalOverlay> {children} </ModalOverlay>,
          overlayElement
        )}
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleCart: () => dispatch(toggleCart()),
});

export default connect(null, mapDispatchToProps)(Modal);
