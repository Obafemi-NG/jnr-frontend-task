import React, { PureComponent } from "react";

import { selectCurrencySymbol } from "../../redux/currency/currency.selector";

import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

import {
  selectCartItems,
  selectCartTotalPrice,
} from "../../redux/cart/cart.selector";

import { ReactComponent as AngleRight } from "../../assets/angle-right.svg";
import { ReactComponent as AngleLeft } from "../../assets/angle-left.svg";
import { addItem, removeItem } from "../../redux/cart/cart.action";
import styles from "./cart-item.module.css";

class CartItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
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
  render() {
    const { cartItem, currencySymbol, addItem, removeItem } = this.props;
    const galleryCount = cartItem.gallery.length - 1;
    return (
      <div key={cartItem.id} className={styles["cart-item"]}>
        <div className={styles["left-section"]}>
          <h4 className={styles.brand}> {cartItem.brand} </h4>
          <p className={styles.name}> {cartItem.name} </p>
          <p className={styles.amount}>
            {" "}
            {currencySymbol}
            {cartItem.amount.toFixed(2)}{" "}
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
                  {key === "Color" ? null : cartItem.attributes[key]}{" "}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles["middle-section"]}>
          <div onClick={() => addItem(cartItem)} className={styles.increase}>
            {" "}
            +{" "}
          </div>
          <div> {cartItem.quantity} </div>
          <div onClick={() => removeItem(cartItem)} className={styles.decrease}>
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
                onClick={this.handleNextImage}
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

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
