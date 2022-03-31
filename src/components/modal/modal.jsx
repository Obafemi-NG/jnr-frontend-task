import { Fragment } from "react";
import ReactDOM from "react-dom";

import styles from "./modal.module.css";

const Backdrop = () => {
  return <div className={styles.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles.cart}> {props.children} </div>
    </div>
  );
};

const overlayElement = document.getElementById("overlay");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, overlayElement)};
      {ReactDOM.createPortal(
        <ModalOverlay> {props.children} </ModalOverlay>,
        overlayElement
      )}
      ;
    </Fragment>
  );
};

export default Modal;
