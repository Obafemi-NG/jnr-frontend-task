import React from "react";
import { ReactComponent as Cart } from "../../assets/cart.svg";

import { connect } from "react-redux";

import { toggleCart } from "../../redux/cart/cart.action";

import styles from "./cart-icon.module.css";

class CartIcon extends React.Component {
  render() {
    const { toggleCart } = this.props;
    return (
      <div className={styles["cart-icon"]} onClick={toggleCart}>
        <Cart />
        <div className={styles.badge}>0</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleCart: () => dispatch(toggleCart()),
});

export default connect(null, mapDispatchToProps)(CartIcon);
