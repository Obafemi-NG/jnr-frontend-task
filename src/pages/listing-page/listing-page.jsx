import React from "react";
import CartOverlay from "../../components/cart-overlay/cart-overlay";

import { connect } from "react-redux";

import styles from "./listing-page.module.css";
import CurrencyDropdown from "../../components/currency-dropdown/currency-dropdown";

class ListingPage extends React.Component {
  render() {
    const { hidden, currencyHidden } = this.props;
    return (
      <div className={styles.overview}>
        {hidden ? null : <CartOverlay />}
        {currencyHidden ? null : <CurrencyDropdown />}
        <div className={styles.title}> Category Name</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hidden: state.cart.hidden,
  currencyHidden: state.currency.hidden,
});

export default connect(mapStateToProps)(ListingPage);
