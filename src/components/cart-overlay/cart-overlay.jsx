import React, { PureComponent } from "react";
import Modal from "../cart-modal/cart-modal";
import styles from "./cart-overlay.module.css";
import { connect } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  toggleCart,
  removeItemFromCart,
} from "../../redux/cart/cart.action";

import { withRouter } from "../../withRouter";
import { createStructuredSelector } from "reselect";
import {
  selectCartItemCount,
  selectCartItems,
  selectCartTotalPrice,
} from "../../redux/cart/cart.selector";
import { selectCurrencySymbol } from "../../redux/currency/currency.selector";

class CartOverlay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
    };
    this.handleViewBag = this.handleViewBag.bind(this);
  }

  handleViewBag = () => {
    this.props.navigate("/cart");
    this.props.toggleCart();
  };

  decreaseCart = (i, quantity) => {
    if (quantity === 1) {
      this.props.removeItem(i);
    } else {
      this.props.decreaseQuantity(i);
    }
  };

  render() {
    const {
      cartItems,
      increaseQuantity,
      decreaseQuantity,
      itemCount,
      totalPrice,
      currencySymbol,
    } = this.props;
    return (
      <Modal>
        {itemCount >= 1 ? (
          <div className={styles["cart-items-container"]}>
            <div className={styles.title}>
              {" "}
              <span className={styles.headline}> My Bag, </span>{" "}
              <span>
                {" "}
                {itemCount} {itemCount > 1 ? "Items" : "Item"}{" "}
              </span>{" "}
            </div>
            {cartItems.map((cartItem, i) => {
              return (
                <div key={i} className={styles["cart-item"]}>
                  <div className={styles["left-section"]}>
                    <p> {cartItem.name} </p>
                    <h4 className={styles.price}>
                      {" "}
                      {`${cartItem.symbol}${cartItem.amount.toFixed(2)} `}{" "}
                    </h4>
                    <div className={styles["attribute-container"]}>
                      {Object.keys(cartItem.attributes).map((key) => {
                        return key === "Color" ? (
                          <div key={key} className={styles.attributes}>
                            <p className={styles["attribute-key"]}>
                              {" "}
                              {key.toUpperCase()}{" "}
                            </p>
                            <div
                              style={{
                                backgroundColor: cartItem.attributes[key],
                                minWidth: "20px",
                                border: "none",
                              }}
                              className={styles.attribute}
                            >
                              {" "}
                            </div>
                          </div>
                        ) : (
                          <div key={key} className={styles.attributes}>
                            <p className={styles["attribute-key"]}>
                              {" "}
                              {key.toUpperCase()}{" "}
                            </p>
                            <div className={styles.attribute}>
                              {key === "Color"
                                ? null
                                : cartItem.attributes[key]}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className={styles["middle-section"]}>
                    <div
                      onClick={() => increaseQuantity(i)}
                      className={styles.increase}
                    >
                      +
                    </div>
                    <div className={styles.quantity}>{cartItem.quantity}</div>
                    <div
                      onClick={() => this.decreaseCart(i, cartItem.quantity)}
                      className={styles.decrease}
                    >
                      -
                    </div>
                  </div>
                  <div className={styles["right-section"]}>
                    <div className={styles["image-container"]}>
                      <img
                        className={styles["cart-image"]}
                        src={cartItem.gallery[this.state.imageIndex]}
                        alt={cartItem.name}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            <div className={styles.total}>
              <h5 className={styles["total-title"]}> Total </h5>
              <p className={styles.amount}>
                {" "}
                {currencySymbol}
                {totalPrice.toFixed(2)}{" "}
              </p>
            </div>
          </div>
        ) : (
          <div className={styles["empty-cart-message"]}>
            {" "}
            Your Cart is Empty!{" "}
          </div>
        )}
        <div className={styles.cta}>
          <button
            onClick={this.handleViewBag}
            className={`${styles.btn} ${styles["view-bag"]}`}
          >
            VIEW BAG
          </button>
          <button
            disabled={true}
            className={`${styles.btn} ${styles.checkout}`}
          >
            CHECK OUT
          </button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  itemCount: selectCartItemCount,
  totalPrice: selectCartTotalPrice,
  currencySymbol: selectCurrencySymbol,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCart: () => dispatch(toggleCart()),
  increaseQuantity: (item) => dispatch(increaseQuantity(item)),
  decreaseQuantity: (item) => dispatch(decreaseQuantity(item)),
  removeItem: (item) => dispatch(removeItemFromCart(item)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartOverlay)
);
