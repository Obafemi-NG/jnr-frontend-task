import React, { Component } from "react";
import styles from "./cart-page.module.css";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  selectCartTotalPrice,
} from "../../redux/cart/cart.selector";
import { selectCurrencySymbol } from "../../redux/currency/currency.selector";

import { ReactComponent as AngleRight } from "../../assets/angle-right.svg";
import { ReactComponent as AngleLeft } from "../../assets/angle-left.svg";
import { addItem, removeItem } from "../../redux/cart/cart.action";

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartId: "",
      imageIndex: 0,
    };
  }

  handleNextImage = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        imageIndex: prevState.imageIndex + 1,
      };
    });
  };
  handlePrevImage = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        imageIndex: prevState.imageIndex - 1,
      };
    });
  };

  // handleId = (id) => {
  //   this.setState((prevState) => {
  //     return { ...prevState, cartId: id };
  //   });
  // };
  // handleNextImage = (id) => {
  //   this.handleId(id);
  //   if (this.state.cartId === id) {
  //     return this.setState((prevState) => {
  //       return {
  //         ...prevState,
  //         imageIndex: prevState.imageIndex + 1,
  //       };
  //     });
  //   } else {
  //     return {
  //       ...this.state,
  //       imageIndex: 0,
  //     };
  //   }
  // };
  // handlePrevImage = () => {
  //   this.setState((prevState) => {
  //     return {
  //       ...prevState,
  //       imageIndex: prevState.imageIndex - 1,
  //     };
  //   });
  // };

  render() {
    const { cartItems, currencySymbol, addItem, removeItem, totalAmount } =
      this.props;
    console.log(this.state.cartId);

    return (
      <div className={styles["cart-page"]}>
        <div className={styles.title}>CART</div>
        <div className={styles["cart-items"]}>
          {cartItems.map((cartItem) => {
            const galleryCount = cartItem.gallery.length - 1;
            return (
              <div key={cartItem.id} className={styles["cart-item"]}>
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
                          key={key}
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
                  <div className={styles["angle-left-container"]}>
                    {!(this.state.imageIndex === 0) && (
                      <div
                        onClick={this.handlePrevImage}
                        className={styles["angle-left"]}
                      >
                        <AngleLeft />{" "}
                      </div>
                    )}
                  </div>
                  <div className={styles["image-container"]}>
                    <img
                      className={styles["cart-image"]}
                      src={cartItem.gallery[this.state.imageIndex]}
                      alt={cartItem.name}
                    />
                  </div>
                  <div className={styles["angle-right-container"]}>
                    {!(this.state.imageIndex === galleryCount) && (
                      <div
                        onClick={() => this.handleNextImage(cartItem.id)}
                        className={styles["angle-right"]}
                      >
                        {" "}
                        <AngleRight />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles["total-section"]}>
          <h4 className={styles.total}>TOTAL</h4>
          <p className={styles["total-amount"]}>
            {" "}
            {currencySymbol}
            {Math.ceil(totalAmount)}{" "}
          </p>
        </div>
        <div className={styles.cta}>
          <button className={styles["checkout-btn"]}>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  currencySymbol: selectCurrencySymbol,
  totalAmount: selectCartTotalPrice,
});
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
