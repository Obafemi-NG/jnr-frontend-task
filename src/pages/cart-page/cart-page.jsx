import React, { PureComponent } from "react";
import styles from "./cart-page.module.css";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectAllCartItemCount,
  selectCartItems,
  selectCartTotalPrice,
} from "../../redux/cart/cart.selector";
import { selectCurrencySymbol } from "../../redux/currency/currency.selector";

import CartItem from "../../components/cart-item/cart-item";

class CartPage extends PureComponent {
  render() {
    const { cartItems, currencySymbol, totalAmount, itemCount } = this.props;

    return (
      <div className={styles["cart-page"]}>
        <div className={styles.title}>CART</div>
        {cartItems.length >= 1 ? (
          <div className={styles["cart-items"]}>
            {cartItems.map((cartItem) => {
              return <CartItem key={cartItem.id} cartItem={cartItem} />;
            })}
          </div>
        ) : (
          <div className={styles["empty-message"]}>
            Your Cart is Currently Empty !
          </div>
        )}

        {cartItems.length ? (
          <div className={styles["bottom-section"]}>
            <div className={styles.top}>
              <div className={styles["tax-section"]}>
                <h4 className={styles.total}>Tax</h4>
                <p className={styles["total-amount"]}>
                  {" "}
                  {`${currencySymbol} 50.00`}{" "}
                </p>
              </div>
              <div className={styles["quantity-section"]}>
                <h4 className={styles.total}>Qty</h4>
                <p className={styles["total-amount"]}>{itemCount}</p>
              </div>
            </div>
            <div className={styles["total-section"]}>
              <h4 className={styles.total}>Total</h4>
              <p className={styles["total-amount"]}>
                {" "}
                {currencySymbol}
                {totalAmount.toFixed(2)}{" "}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}

        {cartItems.length ? (
          <div className={styles.cta}>
            <button disabled={true} className={styles["checkout-btn"]}>
              ORDER
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
  itemCount: selectAllCartItemCount,
});

export default connect(mapStateToProps)(CartPage);
