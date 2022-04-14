import React from "react";
import styles from "./header.module.css";

import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

import { toggleCurrencyDropdown } from "../../redux/currency/currency.action";
import { changeCategory } from "../../redux/product/product.action";

import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";

import CartIcon from "../cart-icon/cart-icon";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Angledown } from "../../assets/angle-down.svg";
import { ReactComponent as Angleup } from "../../assets/angle-up.svg";
import { Link } from "react-router-dom";
import { selectCurrencyHidden } from "../../redux/currency/currency.selector";
import { selectChangeCurrency } from "../../redux/currency/currency.selector";

class Header extends React.Component {
  render() {
    const { toggleCurrencyDropdown, hidden, currencyLabel, changeCategory } =
      this.props;
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
                      <Link
                        to={`${category.name}`}
                        onClick={() => changeCategory(category.name)}
                        key={category.name}
                        className={styles["category-link"]}
                      >
                        {category.name.toUpperCase()}
                      </Link>
                    );
                  })}
                </div>
              );
            }
          }}
        </Query>
        <div className={styles["icon-container"]}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className={styles["navbar-left"]}>
          <div className={styles.icon}>
            {currencyLabel}
            <span
              onClick={toggleCurrencyDropdown}
              className={styles["angle-icon"]}
            >
              {hidden ? <Angledown /> : <Angleup />}
            </span>
          </div>
          <div className={`${styles.icon} ${styles["cart-icon"]} `}>
            <CartIcon />
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   hidden: state.currency.hidden,
//   currencyLabel: state.currency.preferredCurrencyLabel,
// });

const mapStateToProps = createStructuredSelector({
  hidden: selectCurrencyHidden,
  currencyLabel: selectChangeCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCurrencyDropdown: () => dispatch(toggleCurrencyDropdown()),
  changeCategory: (category) => dispatch(changeCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
