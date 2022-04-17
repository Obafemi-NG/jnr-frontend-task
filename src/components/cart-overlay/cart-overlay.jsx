import React from "react";
import Modal from "../cart-modal/cart-modal";
import styles from "./cart-overlay.module.css";
import { connect } from "react-redux";
import { addItem, removeItem, toggleCart } from "../../redux/cart/cart.action";

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
  }

  handleViewBag = () => {
    this.props.navigate("/cart");
    this.props.toggleCart();
  };

  handleViewNextImage = () => {
    this.setState((prevState) => prevState.imageIndex + 1);
  };

  handleViewPrevImage = () => {
    this.setState((prevState) => prevState.imageIndex - 1);
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
              return (
                <div key={cartItem.id} className={styles["cart-item"]}>
                  <div className={styles["left-section"]}>
                    <p> {cartItem.name} </p>
                    <h4 className={styles.price}>
                      {" "}
                      {`${cartItem.symbol}${cartItem.amount} `}{" "}
                    </h4>
                    {/* {cartItem.attribute.map((attr) => {
                      return (
                        <div className={styles.attributes}>
                          {attr.Capacity ? (
                            <div className={styles.attribute}>
                              {" "}
                              {attr.Capacity}{" "}
                            </div>
                          ) : null}
                          {attr.Color ? (
                            <div
                              style={{
                                backgroundColor: attr.Color,
                                width: "20px",
                              }}
                              className={styles.attribute}
                            >
                              {" "}
                            </div>
                          ) : null}
                          {attr.Size ? (
                            <div className={styles.attribute}>
                              {" "}
                              {attr.Size}{" "}
                            </div>
                          ) : null}
                        </div>
                      );
                    })} */}
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
                    <img
                      className={styles["cart-image"]}
                      src={cartItem.gallery[this.state.imageIndex]}
                      alt={cartItem.name}
                    />
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
