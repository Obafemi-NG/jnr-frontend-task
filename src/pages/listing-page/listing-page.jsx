import React from "react";
import CartOverlay from "../../components/cart-overlay/cart-overlay";

import { connect } from "react-redux";

import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

import styles from "./listing-page.module.css";
import CurrencyDropdown from "../../components/currency-dropdown/currency-dropdown";

import { addItem } from "../../redux/cart/cart.action";

import Card from "../../components/card/card";
import { Link } from "react-router-dom";

class ListingPage extends React.Component {
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
            attributes {
              id
              name
              type
              items {
                displayValue
                value
              }
            }
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

                return products.map((product) => {
                  const productPrice = product.prices.find(
                    (currency) =>
                      currency.currency.label === this.props.currencyLabel
                  );

                  //I am close to cracking this ProductAttribute thingyyy!.

                  return (
                    <Card key={product.id}>
                      <div className={styles["img-container"]}>
                        <img
                          className={styles["product-img"]}
                          src={product.gallery[0]}
                          alt={product.name}
                        />
                      </div>
                      <div className={styles["attribute-container"]}>
                        {product.attributes.map((attr) => {
                          return (
                            <span key={attr.name}>
                              <span className={styles["attribute-name"]}>
                                {attr.name.toUpperCase()} :
                              </span>
                              <div className={styles.attributes}>
                                {attr.items.map((item) => {
                                  return (
                                    <span key={item.value}>
                                      <div className={styles["attribute-box"]}>
                                        <input
                                          id={item.id}
                                          type="checkbox"
                                          name={item.value}
                                        />
                                        <label
                                          style={{
                                            backgroundColor: item.value,
                                            minWidth: "30px",
                                          }}
                                          for={item.value}
                                        >
                                          {attr.type === "swatch"
                                            ? " "
                                            : item.value}{" "}
                                        </label>
                                      </div>
                                    </span>
                                  );
                                })}
                              </div>
                            </span>
                          );
                        })}
                      </div>
                      <Link to={`/product/${product.id}`}>
                        <div className={styles["card-footer"]}>
                          <p className={styles["product-name"]}>
                            {" "}
                            {product.name}{" "}
                          </p>
                          <p className={styles["product-price"]}>
                            {" "}
                            {productPrice.currency.symbol}
                            {productPrice.amount}{" "}
                          </p>
                        </div>
                      </Link>
                    </Card>
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
  currencyLabel: state.currency.preferredCurrencyLabel,
});

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);
