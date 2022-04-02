import React from "react";
import Modal from "../cart-modal/cart-modal";
import styles from "./cart-overlay.module.css";

class CartOverlay extends React.Component {
  render() {
    return (
      <Modal>
        <div className={styles["cart-items"]}></div>
        <div className={styles.cta}>
          <button className={`${styles.btn} ${styles["view-bag"]}`}>
            VIEW BAG
          </button>
          <button className={`${styles.btn} ${styles.checkout}`}>
            CHECK OUT
          </button>
        </div>
      </Modal>
    );
  }
}

export default CartOverlay;
