import React from "react";
import Modal from "../cart-modal/cart-modal";
import styles from "./cart-overlay.module.css";

import { withRouter } from "../../withRouter";

class CartOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.handleViewBag = this.handleViewBag.bind(this);
  }

  handleViewBag = () => {
    this.props.navigate("/cart");
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

export default withRouter(CartOverlay);
