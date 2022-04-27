import React, { Component, PureComponent } from "react";
import styles from "./cart-page.module.css";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  selectCartTotalPrice,
} from "../../redux/cart/cart.selector";
import { selectCurrencySymbol } from "../../redux/currency/currency.selector";

import CartItem from "../../components/cart-item/cart-item";

class CartPage extends PureComponent {
  render() {
    const { cartItems, currencySymbol, totalAmount } = this.props;

    return (
      <div className={styles["cart-page"]}>
        <div className={styles.title}>CART</div>
        {cartItems.length >= 1 ? (
          <div className={styles["cart-items"]}>
            {cartItems.map((cartItem) => {
              return <CartItem cartItem={cartItem} />;
            })}
          </div>
        ) : (
          <div className={styles["empty-message"]}>
            Your Cart is Currently Empty !
          </div>
        )}

        {cartItems.length ? (
          <div className={styles["total-section"]}>
            <h4 className={styles.total}>TOTAL</h4>
            <p className={styles["total-amount"]}>
              {" "}
              {currencySymbol}
              {totalAmount.toFixed(2)}{" "}
            </p>
          </div>
        ) : (
          ""
        )}

        {cartItems.length ? (
          <div className={styles.cta}>
            <button disabled={true} className={styles["checkout-btn"]}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  currencySymbol: selectCurrencySymbol,
  totalAmount: selectCartTotalPrice,
});

export default connect(mapStateToProps)(CartPage);
