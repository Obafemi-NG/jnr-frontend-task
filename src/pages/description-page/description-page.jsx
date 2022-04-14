import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import styles from "./description-page.module.css";
import CartOverlay from "../../components/cart-overlay/cart-overlay";
import CurrencyDropdown from "../../components/currency-dropdown/currency-dropdown";
import { connect } from "react-redux";

class DescriptionPage extends Component {
  constructor(props) {
    super(props);
    this.handleImage = this.handleImage.bind(this);
    this.state = {
      imageIndex: 0,
    };
  }
  handleImage = (index) => {
    this.setState({ imageIndex: index });
  };
  render() {
    const { hidden, currencyHidden } = this.props;
    const currentID = window.location.pathname.split("/")[2];
    const PRODUCT_DETAILS = gql`
      {
        product(id: ${JSON.stringify(currentID)} ) {
          id
          name
          description
          gallery
          inStock
          brand
          attributes {
            id
            name
            type
            items{
              id
              value
              displayValue
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
    `;
    return (
      <div className={styles["description-page"]}>
        {hidden ? null : <CartOverlay />}
        {currencyHidden ? null : <CurrencyDropdown />}
        <Query query={PRODUCT_DETAILS}>
          {({ loading, error, data }) => {
            if (loading) return <div> Loading... </div>;
            if (error) return <div> Error Loading Product details. </div>;
            else {
              console.log(data);
              const productInfo = data.product;
              console.log(productInfo.description);
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
                    <div className={styles["cta-section"]}>
                      <button className={styles["cta-button"]}>
                        {" "}
                        ADD TO CART{" "}
                      </button>
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

const mapStateToProps = (state) => ({
  hidden: state.cart.hidden,
  currencyHidden: state.currency.hidden,
});

export default connect(mapStateToProps)(DescriptionPage);
