import React from "react";
import Modal from "../cart-modal/cart-modal";
import styles from "./cart-overlay.module.css";
import { connect } from "react-redux";
import { toggleCart } from "../../redux/cart/cart.action";

import { withRouter } from "../../withRouter";
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "../../redux/cart/cart.selector";

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
    const { cartItems } = this.props;
    return (
      <Modal>
        {cartItems.length ? (
          <div className={styles["cart-items-container"]}>
            <div className={styles.title}>
              {" "}
              <span className={styles.headline}> My Bag, </span>{" "}
              <span>
                {" "}
                {cartItems.length} {cartItems.length > 1 ? "Items" : "Item"}{" "}
              </span>{" "}
            </div>
            {cartItems.map((cartItem) => {
              return (
                <div className={styles["cart-item"]}>
                  <div className={styles["left-section"]}>
                    <p> {cartItem.name} </p>
                    <h4 className={styles.price}>
                      {" "}
                      {`${cartItem.symbol}${cartItem.amount} `}{" "}
                    </h4>
                  </div>
                  <div className={styles["middle-section"]}>
                    <div className={styles.increase}>+</div>
                    <div className={styles.quantity}>{cartItem.quantity}</div>
                    <div className={styles.decrease}>-</div>
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
});

const mapDispatchToProps = (dispatch) => ({
  toggleCart: () => dispatch(toggleCart()),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartOverlay)
);
