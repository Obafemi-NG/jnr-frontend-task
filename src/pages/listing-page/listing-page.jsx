import React, { PureComponent } from "react";
import CartOverlay from "../../components/cart-overlay/cart-overlay";

import { connect } from "react-redux";

import { Product_lists } from "../../queries";

import { Query } from "@apollo/client/react/components";

import styles from "./listing-page.module.css";
import CurrencyDropdown from "../../components/currency-dropdown/currency-dropdown";

import { addItem } from "../../redux/cart/cart.action";

import Card from "../../components/card/card";
import { Link } from "react-router-dom";

import { ReactComponent as Cart } from "../../assets/white-cart.svg";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selector";
import {
  selectCurrencyHidden,
  selectCurrencySymbol,
} from "../../redux/currency/currency.selector";
import { selectCategory } from "../../redux/product/product.selector";
import { withRouter } from "../../withRouter";

class ListingPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      attributes: {},
    };
  }

  render() {
    const { hidden, currencyHidden, category, addItemToCart } = this.props;
    return (
      <div className={styles.overview}>
        {hidden ? null : <CartOverlay />}
        {currencyHidden ? null : <CurrencyDropdown />}
        <div className={styles.title}> {category.toUpperCase()} </div>
        <div className={styles["product-lists"]}>
          <Query query={Product_lists}>
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
                      currency.currency.symbol === this.props.currencySymbol
                  );

                  const cartProduct = {
                    name: product.name,
                    brand: product.brand,
                    gallery: product.gallery,
                    id: product.id,
                    amount: productPrice.amount,
                    symbol: productPrice.currency.symbol,
                    attributes: this.state.attributes,
                  };
                  return (
                    <Card inStock={product.inStock} key={product.id}>
                      <div className={styles["card-overlay"]}>
                        <div className={styles["img-container"]}>
                          <Link to={`/product/${product.id}`}>
                            <img
                              className={styles["product-img"]}
                              src={product.gallery[0]}
                              alt={product.name}
                            />
                          </Link>
                          <div className={styles["out-of-stock"]}>
                            {" "}
                            {!product.inStock && "OUT OF STOCK"}{" "}
                          </div>
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
                        {product.inStock && (
                          <div
                            onClick={
                              (this.handleAddToCart = () => {
                                this.props.navigate(`/product/${product.id}`);
                              })
                            }
                            className={styles["add-to-cart-btn"]}
                          >
                            <Cart />
                          </div>
                        )}
                      </div>
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
const mapStateToProps = createStructuredSelector({
  hidden: selectCartHidden,
  currencyHidden: selectCurrencyHidden,
  category: selectCategory,
  currencySymbol: selectCurrencySymbol,
});

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItem(item)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListingPage)
);
