import React, { PureComponent } from "react";
import { Query } from "@apollo/client/react/components";

import { PRODUCT_DETAILS } from "../../queries";

import styles from "./description-page.module.css";
import CartOverlay from "../../components/cart-overlay/cart-overlay";
import CurrencyDropdown from "../../components/currency-dropdown/currency-dropdown";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.action";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selector";
import {
  selectCurrencyHidden,
  selectCurrencySymbol,
} from "../../redux/currency/currency.selector";

class DescriptionPage extends PureComponent {
  constructor(props) {
    super(props);
    this.handleImage = this.handleImage.bind(this);
    this.state = {
      imageIndex: 0,
      selectedId: null,
      attributes: {},
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  changeHandler = (value, id) => {
    if (value) {
      this.setState({
        selectedId: id,
      });
    } else {
      // handle de-select
    }
  };

  handleImage = (index) => {
    this.setState({ imageIndex: index });
  };

  render() {
    const { addItemToCart } = this.props;
    const { hidden, currencyHidden, currencySymbol } = this.props;
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
                attributes: this.state.attributes,
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
                          <span key={attribute.id}>
                            <h4 className={styles["attribute-title"]}>
                              {" "}
                              {`${attribute.name.toUpperCase()} :`}{" "}
                            </h4>
                            <div className={styles.attributes}>
                              {/* {attribute.type !== "swatch" && (
                                <div className={styles["non-swatch"]}>
                                  {attribute.items.map((item) => {
                                    return (
                                      <div
                                        onClick={
                                          (this.handleChoice = () => {
                                            this.setState({
                                              attributes: {
                                                ...this.state.attributes,
                                                [attribute.name]: item.value,
                                              },
                                            });
                                            console.log(this.state.attributes);
                                          })
                                        }
                                        className={`${styles.attribute} ${
                                          this.state.attributes > 0 &&
                                          this.state.attributes.name ===
                                            item.name
                                            ? styles.active
                                            : ""
                                        } `}
                                        key={item.id}
                                      >
                                        {item.value}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                              {attribute.type === "swatch" && (
                                <div className={styles.swatch}>
                                  {attribute.items.map((item) => {
                                    return (
                                      <div
                                        className={styles["swatch-attribute"]}
                                        key={item.id}
                                        style={{
                                          width: "30px",
                                          height: "25px",
                                          backgroundColor: item.value,
                                          border: "1px solid gray",
                                        }}
                                      />
                                    );
                                  })}
                                </div>
                              )} */}

                              {attribute.items.map((item) => {
                                const isChecked =
                                  item.id === this.state.selectedId;

                                return (
                                  <span key={item.id}>
                                    <div
                                      onClick={
                                        (this.handleChoice = () => {
                                          this.setState({
                                            ...this.state,
                                            attributes: {
                                              ...this.state.attributes,
                                              [attribute.name]: item.value,
                                            },
                                          });
                                          console.log(this.state.selectedId);
                                          console.log(
                                            this.state.attributes.length
                                          );
                                        })
                                      }
                                      className={styles["attribute-box"]}
                                    >
                                      <input
                                        id={item.id}
                                        type="checkbox"
                                        name="attribute"
                                        checked={isChecked}
                                        onChange={(e) =>
                                          this.changeHandler(
                                            e.target.checked,
                                            item.id
                                          )
                                        }
                                      />
                                      <label
                                        style={{
                                          backgroundColor: item.value,
                                          minWidth: "30px",
                                        }}
                                        htmlFor={item.value}
                                      >
                                        {attribute.type === "swatch"
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
                              if (
                                Object.keys(this.state.attributes).length === 0
                              ) {
                                return;
                              }
                            }
                            addItemToCart(cartProduct);
                            this.setState({
                              attributes: {},
                            });
                          })
                        }
                        className={styles["cta-button"]}
                      >
                        {" "}
                        ADD TO CART{" "}
                      </button>
                    </div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: productInfo.description,
                      }}
                      className={styles["description-section"]}
                    ></div>
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
});

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionPage);
