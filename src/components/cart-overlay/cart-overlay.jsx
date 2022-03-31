import Modal from "../modal/modal";
import styles from "./cart-overlay.module.css";

const CartOverlay = () => {
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
};

export default CartOverlay;
