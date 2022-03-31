import { Fragment } from "react";
import { ReactDOM } from "react";

import styles from "./modal.module.css";

const Backdrop = () => {
  return <div className={styles.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles["modal-overlay"]}>
      <div> {props.children} </div>
    </div>
  );
};

const overlay = document.getElementById("overlay");

const Modal = () => {
  <Fragment>
    {ReactDOM.createPortal(<Backdrop />, overlay)};
    {ReactDOM.createPortal(<ModalOverlay />, overlay)};
  </Fragment>;
};

export default Modal;
