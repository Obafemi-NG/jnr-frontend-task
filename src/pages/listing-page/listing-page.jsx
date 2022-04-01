import React from "react";
import CartOverlay from "../../components/cart-overlay/cart-overlay";

import { connect } from "react-redux";

import styles from "./listing-page.module.css";

class ListingPage extends React.Component {
  render() {
    const { hidden } = this.props;
    return (
      <div className={styles.overview}>
        {hidden ? null : <CartOverlay />}
        <div className={styles.title}> Category Name</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hidden: state.cart.hidden,
});

export default connect(mapStateToProps)(ListingPage);
