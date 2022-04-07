import React from "react";
import CartOverlay from "../../components/cart-overlay/cart-overlay";

import { connect } from "react-redux";

import { withRouter } from "../../withRouter";

import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

import styles from "./listing-page.module.css";
import CurrencyDropdown from "../../components/currency-dropdown/currency-dropdown";

import Card from "../../components/card/card";
import { Link } from "react-router-dom";

class ListingPage extends React.Component {
  // handleViewProduct = () => {
  //   this.props.navigate("/:id");
  // };

  render() {
    const PRODUCT_LISTS = gql`
      {
        categories {
          name
          products {
            id
            name
            description
            gallery
            inStock
            prices {
              amount
              currency {
                label
                symbol
              }
            }
          }
        }
      }
    `;
    const { hidden, currencyHidden, category } = this.props;
    return (
      <div className={styles.overview}>
        {hidden ? null : <CartOverlay />}
        {currencyHidden ? null : <CurrencyDropdown />}
        <div className={styles.title}> {category.toUpperCase()} </div>
        <div className={styles["product-lists"]}>
          <Query query={PRODUCT_LISTS}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div> Error! {error.message} </div>;
              else {
                const categories = data.categories.map((category) => category);
                const { products } = categories.find(
                  (category) => category.name === this.props.category
                );
                products.map((product) => console.log(product.prices));
                return products.map((product) => {
                  const productPrice = product.prices.find(
                    (currency) =>
                      currency.currency.label === this.props.preferredCurrency
                  );

                  return (
                    <Link to={`/${product.id}`} key={product.id}>
                      <Card>
                        <div className={styles["img-container"]}>
                          <img
                            className={styles["product-img"]}
                            src={product.gallery[0]}
                            alt={product.name}
                          />
                        </div>
                        <div className={styles["card-footer"]}>
                          <p
                            onClick={this.handleViewProduct}
                            className={styles["product-name"]}
                          >
                            {" "}
                            {product.name}{" "}
                          </p>
                          <p className={styles["product-price"]}>
                            {" "}
                            {productPrice.currency.symbol}
                            {productPrice.amount}{" "}
                          </p>
                        </div>
                      </Card>
                    </Link>
                  );
                });
              }
            }}
          </Query>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hidden: state.cart.hidden,
  currencyHidden: state.currency.hidden,
  category: state.product.category,
  preferredCurrency: state.product.preferredCurrency,
});

export default connect(mapStateToProps)(ListingPage);
