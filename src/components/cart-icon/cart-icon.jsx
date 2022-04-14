import React from "react";
import { ReactComponent as Cart } from "../../assets/cart.svg";

import { connect } from "react-redux";

import { selectCartItemCount } from "../../redux/cart/cart.selector";

import { toggleCart } from "../../redux/cart/cart.action";

import styles from "./cart-icon.module.css";
import { createStructuredSelector } from "reselect";

class CartIcon extends React.Component {
  render() {
    const { toggleCart, itemCount } = this.props;
    return (
      <div className={styles["cart-icon"]} onClick={toggleCart}>
        <Cart />
        <div className={styles.badge}>{itemCount}</div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemCount,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCart: () => dispatch(toggleCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
