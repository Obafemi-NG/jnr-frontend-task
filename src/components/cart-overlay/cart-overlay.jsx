import React from "react";
import Modal from "../cart-modal/cart-modal";
import styles from "./cart-overlay.module.css";
import { connect } from "react-redux";
import { addItem, removeItem, toggleCart } from "../../redux/cart/cart.action";

import { ReactComponent as AngleLeft } from "../../assets/angle-left.svg";

import { ReactComponent as AngleRight } from "../../assets/angle-right.svg";

import { withRouter } from "../../withRouter";
import { createStructuredSelector } from "reselect";
import {
  selectCartItemCount,
  selectCartItems,
} from "../../redux/cart/cart.selector";

class CartOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
    };
    this.handleViewBag = this.handleViewBag.bind(this);
    this.handleViewNextImage = this.handleViewNextImage.bind(this);
    this.handleViewPrevImage = this.handleViewPrevImage.bind(this);
  }

  handleViewBag = () => {
    this.props.navigate("/cart");
    this.props.toggleCart();
  };

  handleViewNextImage = () => {
    this.setState((prevState) => {
      return { imageIndex: prevState.imageIndex + 1 };
    });
  };

  handleViewPrevImage = () => {
    this.setState((prevState) => {
      return { imageIndex: prevState.imageIndex - 1 };
    });
  };

  render() {
    const { cartItems, addItem, removeItem, itemCount } = this.props;
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
            {cartItems.map((cartItem) => {
              const maxIndex = cartItem.gallery.length - 1;
              // const attribute = Object.keys(cartItem.attributes).forEach(
              //   (key, index) => console.log(cartItem.attributes[key])
              // );
              // const attributeKey = Object.keys(cartItem.attributes).forEach(
              //   (key) => console.log(key)
              // );

              // const attribute = Object.values(cartItem.attributes).forEach(
              //   (value) => console.log(value)
              // );
              // const attributeKey = Object.keys(cartItem.attributes).forEach(
              //   (key) => {
              //     return key;
              //   }
              // );

              // console.log(attributeKey);
              // console.log(attribute);

              return (
                <div key={cartItem.id} className={styles["cart-item"]}>
                  <div className={styles["left-section"]}>
                    <p> {cartItem.name} </p>
                    <h4 className={styles.price}>
                      {" "}
                      {`${cartItem.symbol}${cartItem.amount} `}{" "}
                    </h4>
                    <div className={styles.attributes}>
                      {Object.keys(cartItem.attributes).map((key) => (
                        <div key={key} className={styles.attribute}>
                          {key === "Color" ? null : cartItem.attributes[key]}
                        </div>
                      ))}
                      {/* <div className={styles.attribute}>Femi</div> */}
                    </div>
                  </div>
                  <div className={styles["middle-section"]}>
                    <div
                      onClick={() => addItem(cartItem)}
                      className={styles.increase}
                    >
                      +
                    </div>
                    <div className={styles.quantity}>{cartItem.quantity}</div>
                    <div
                      onClick={() => removeItem(cartItem)}
                      className={styles.decrease}
                    >
                      -
                    </div>
                  </div>
                  <div className={styles["right-section"]}>
                    <span
                      onClick={this.handleViewPrevImage}
                      className={styles["angle-left"]}
                    >
                      {this.state.imageIndex === 0 ? null : <AngleLeft />}
                    </span>
                    <div>
                      <img
                        className={styles["cart-image"]}
                        src={cartItem.gallery[this.state.imageIndex]}
                        alt={cartItem.name}
                      />
                    </div>

                    <span
                      onClick={this.handleViewNextImage}
                      className={styles["angle-right"]}
                    >
                      {maxIndex === this.state.imageIndex ? null : (
                        <AngleRight />
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
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
          <button className={`${styles.btn} ${styles.checkout}`}>
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
});

const mapDispatchToProps = (dispatch) => ({
  toggleCart: () => dispatch(toggleCart()),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartOverlay)
);
