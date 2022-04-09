import React from "react";
import styles from "./header.module.css";

import { connect } from "react-redux";

import { toggleCurrencyDropdown } from "../../redux/currency/currency.action";
import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";

import CartIcon from "../cart-icon/cart-icon";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Angledown } from "../../assets/angle-down.svg";
import { ReactComponent as Angleup } from "../../assets/angle-up.svg";

class Header extends React.Component {
  render() {
    const { toggleCurrencyDropdown, hidden, currencySymbol } = this.props;
    const GET_LINKS = gql`
      {
        categories {
          name
        }
      }
    `;
    return (
      <div className={styles["navbar"]}>
        <Query query={GET_LINKS}>
          {({ loading, error, data }) => {
            if (loading || error) return null;
            else {
              return (
                <div className={styles["link-container"]}>
                  {data.categories.map((category) => {
                    return (
                      <div
                        key={category.name}
                        className={styles["category-link"]}
                      >
                        {category.name.toUpperCase()}
                      </div>
                    );
                  })}
                </div>
              );
            }
          }}
        </Query>
        <div className={styles["icon-container"]}>
          <Logo />
        </div>
        <div className={styles["navbar-left"]}>
          <div className={styles.icon}>
            {currencySymbol}
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
  currencySymbol: state.currency.preferredCurrencySymbol,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCurrencyDropdown: () => dispatch(toggleCurrencyDropdown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
