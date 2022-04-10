import React from "react";
import Modal from "../cart-modal/cart-modal";
import styles from "./cart-overlay.module.css";
import { connect } from "react-redux";
import { toggleCart } from "../../redux/cart/cart.action";

import { withRouter } from "../../withRouter";

class CartOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.handleViewBag = this.handleViewBag.bind(this);
  }

  handleViewBag = () => {
    this.props.navigate("/cart");
    this.props.toggleCart();
  };

  render() {
    return (
      <Modal>
        <div className={styles["cart-items"]}></div>
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
const mapDispatchToProps = (dispatch) => ({
  toggleCart: () => dispatch(toggleCart()),
});
export default withRouter(connect(null, mapDispatchToProps)(CartOverlay));
