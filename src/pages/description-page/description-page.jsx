import React, { PureComponent } from "react";
import { Query } from "@apollo/client/react/components";
import parse from "html-react-parser";

import { PRODUCT_DETAILS } from "../../queries";

import styles from "./description-page.module.css";
import CartOverlay from "../../components/cart-overlay/cart-overlay";
import CurrencyDropdown from "../../components/currency-dropdown/currency-dropdown";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.action";
import {
  addAttribute,
  resetAttribute,
} from "../../redux/attribute/attribute.action";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selector";
import { selectCartAttribute } from "../../redux/attribute/attribute.selector";
import {
  selectCurrencyHidden,
  selectCurrencySymbol,
} from "../../redux/currency/currency.selector";
import Attribute from "../../components/attribute-input/attribute-component";

class DescriptionPage extends PureComponent {
  constructor(props) {
    super(props);
    this.handleImage = this.handleImage.bind(this);
    this.state = {
      imageIndex: 0,
      selectedId: null,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  changeHandler = (id) => {
    this.setState({
      selectedId: id,
    });
  };

  handleImage = (index) => {
    this.setState({ imageIndex: index });
  };

  render() {
    const { addItemToCart } = this.props;
    const {
      hidden,
      currencyHidden,
      currencySymbol,
      cartAttribute,
      resetItemAttribute,
    } = this.props;
    const currentID = window.location.pathname.split("/")[2];
    return (
      <div className={styles["description-page"]}>
        {hidden ? null : <CartOverlay />}
        {currencyHidden ? null : <CurrencyDropdown />}
        <Query query={PRODUCT_DETAILS(currentID)}>
          {({ loading, error, data }) => {
            if (loading) return <div> Loading... </div>;
            if (error) return <div> Error Loading Product details. </div>;
            else {
              const productInfo = data.product;

              const productPrice = productInfo.prices.find(
                (price) => price.currency.symbol === currencySymbol
              );

              const cartProduct = {
                name: productInfo.name,
                brand: productInfo.brand,
                gallery: productInfo.gallery,
                id: productInfo.id,
                amount: productPrice.amount,
                symbol: productPrice.currency.symbol,
                attributes: cartAttribute,
              };
              return (
                <div className={styles["description-container"]}>
                  <div className={styles["images-section"]}>
                    {productInfo.gallery.map((imageUrl, index) => {
                      return (
                        <img
                          className={styles["individual-image"]}
                          key={imageUrl}
                          src={imageUrl}
                          alt="product."
                          onClick={() => this.handleImage(index)}
                        />
                      );
                    })}
                  </div>
                  <div className={styles["main-image-section"]}>
                    <img
                      className={styles["main-image"]}
                      src={productInfo.gallery[this.state.imageIndex]}
                      alt={productInfo.brand}
                    />
                  </div>
                  <div className={styles["info-section"]}>
                    <h1 className={styles.title}>{productInfo.name}</h1>
                    <p className={styles["sub-title"]}> {productInfo.brand} </p>
                    <div className={styles["attribute-section"]}>
                      {productInfo.attributes.map((attribute) => {
                        return (
                          <Attribute
                            key={attribute.id}
                            attribute={attribute}
                            onClick={
                              (this.handleChoice = () => {
                                this.setState({
                                  ...this.state,
                                  attributes: {
                                    ...this.state.attributes,
                                    [attribute.name]: cartAttribute,
                                  },
                                });
                              })
                            }
                          />
                        );
                      })}
                    </div>
                    <div className={styles["price-section"]}>
                      <h4 className={styles["price-title"]}> PRICE : </h4>
                      <p className={styles["price-amount"]}>
                        {" "}
                        {productPrice.currency.symbol}{" "}
                        {productPrice.amount.toFixed(2)}{" "}
                      </p>
                    </div>
                    <div className={styles["cta-section"]}>
                      <button
                        onClick={
                          (this.handleAddToCart = () => {
                            if (!(productInfo.attributes.length === 0)) {
                              resetItemAttribute();
                              if (Object.keys(cartAttribute).length === 0) {
                                return;
                              }
                            }
                            if (!productInfo.inStock) {
                              return;
                            }
                            addItemToCart(cartProduct);
                            console.log(this.state.attributes);
                            resetItemAttribute();
                          })
                        }
                        className={`${styles["cta-button"]} ${
                          !productInfo.inStock && styles["out-of-stock"]
                        } `}
                      >
                        {" "}
                        ADD TO CART{" "}
                      </button>
                    </div>
                    <div className={styles["description-section"]}>
                      {" "}
                      {parse(`${productInfo.description}`)}{" "}
                    </div>
                  </div>
                </div>
              );
            }
          }}
        </Query>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  hidden: selectCartHidden,
  currencyHidden: selectCurrencyHidden,
  currencySymbol: selectCurrencySymbol,
  cartAttribute: selectCartAttribute,
});

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItem(item)),
  addAttribute: (attribute) => dispatch(addAttribute(attribute)),
  resetItemAttribute: () => dispatch(resetAttribute()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionPage);
