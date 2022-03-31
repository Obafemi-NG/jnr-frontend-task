import { ReactComponent as Cart } from "../../assets/cart.svg";

import styles from "./cart-icon.module.css";

const CartIcon = () => {
  return (
    <div className={styles["cart-icon"]}>
      <Cart />
      <div className={styles.badge}>0</div>
    </div>
  );
};

export default CartIcon;
