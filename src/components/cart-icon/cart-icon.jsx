import { ReactComponent as Cart } from "../../assets/cart.svg";

import { connect } from "react-redux";

import { toggleCart } from "../../redux/cart/cart.action";

import styles from "./cart-icon.module.css";

const CartIcon = ({ toggleCart }) => {
  return (
    <div className={styles["cart-icon"]} onClick={toggleCart}>
      <Cart />
      <div className={styles.badge}>0</div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleCart: () => dispatch(toggleCart()),
});

export default connect(null, mapDispatchToProps)(CartIcon);
