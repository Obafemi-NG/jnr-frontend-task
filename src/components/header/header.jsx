import React from "react";
import styles from "./header.module.css";

import { connect } from "react-redux";

import { toggleCurrencyDropdown } from "../../redux/currency/currency.action";

import CartIcon from "../cart-icon/cart-icon";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Angledown } from "../../assets/angle-down.svg";
import { ReactComponent as Angleup } from "../../assets/angle-up.svg";

class Header extends React.Component {
  render() {
    const { toggleCurrencyDropdown, hidden } = this.props;
    return (
      <div className={styles["navbar"]}>
        <div className={styles["link-container"]}>
          <div className={styles["category-link"]}>WOMEN</div>
          <div className={styles["category-link"]}>MEN</div>
          <div className={styles["category-link"]}>KIDS</div>
          <div className={styles["category-link"]}></div>
        </div>
        <div className={styles["icon-container"]}>
          <Logo />
        </div>
        <div className={styles["navbar-left"]}>
          <div className={styles.icon}>
            $
            <span
              onClick={toggleCurrencyDropdown}
              className={styles["angle-icon"]}
            >
              {hidden ? <Angledown /> : <Angleup />}
            </span>
          </div>
          <div className={styles.icon}>
            <CartIcon />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hidden: state.currency.hidden,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCurrencyDropdown: () => dispatch(toggleCurrencyDropdown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
