import React, { Component } from "react";
import styles from "./cart-page.module.css";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "../../redux/cart/cart.selector";
import { selectCurrencySymbol } from "../../redux/currency/currency.selector";

import { ReactComponent as AngleRight } from "../../assets/angle-right.svg";
import { ReactComponent as AngleLeft } from "../../assets/angle-left.svg";
import { addItem, removeItem } from "../../redux/cart/cart.action";

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
    };
  }
  render() {
    const { cartItems, currencySymbol, addItem, removeItem } = this.props;

    return (
      <div className={styles["cart-page"]}>
        <div className={styles.title}>CART</div>
        <div className={styles["cart-items"]}>
          {cartItems.map((cartItem) => {
            const galleryCount = cartItem.gallery.length - 1;
            return (
              <div className={styles["cart-item"]}>
                <div className={styles["left-section"]}>
                  <h4 className={styles.brand}> {cartItem.brand} </h4>
                  <p className={styles.name}> {cartItem.name} </p>
                  <p className={styles.amount}>
                    {" "}
                    {currencySymbol}
                    {cartItem.amount}{" "}
                  </p>
                  <div className={styles.attributes}>
                    {Object.keys(cartItem.attributes).map((key) => {
                      return key === "Color" ? (
                        <div
                          style={{
                            backgroundColor: cartItem.attributes[key],
                            minWidth: "20px",
                            border: "none",
                          }}
                          className={styles.attribute}
                        ></div>
                      ) : (
                        <div className={styles.attribute}>
                          {" "}
                          {key === "Color"
                            ? null
                            : cartItem.attributes[key]}{" "}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={styles["middle-section"]}>
                  <div
                    onClick={() => addItem(cartItem)}
                    className={styles.increase}
                  >
                    {" "}
                    +{" "}
                  </div>
                  <div> {cartItem.quantity} </div>
                  <div
                    onClick={() => removeItem(cartItem)}
                    className={styles.decrease}
                  >
                    {" "}
                    -{" "}
                  </div>
                </div>
                <div className={styles["right-section"]}>
                  <div className={styles["angle-left"]}>
                    {!(this.state.imageIndex === 0) && <AngleLeft />}
                  </div>
                  <div className={styles["image-container"]}>
                    <img
                      className={styles["cart-image"]}
                      src={cartItem.gallery[this.state.imageIndex]}
                      alt={cartItem.name}
                    />
                  </div>
                  <div className={styles["angle-right"]}>
                    {!(this.state.imageIndex === galleryCount) && (
                      <AngleRight />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  currencySymbol: selectCurrencySymbol,
});
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
