import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import styles from "./description-page.module.css";

class DescriptionPage extends Component {
  render() {
    const PRODUCT_DETAILS = gql`
      {
        product(id : huarache-x-stussy-le ) {
          id
          name
          inStock
          gallery
          description
          category
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
            currency{
                label
                symbol
            }
            amount
          }
          brand
        }
      }
    `;
    return (
      <div className={styles["description-page"]}>
        Description-Page.
        <Query query={PRODUCT_DETAILS}>
          {({ loading, error, data }) => {
            if (loading) return <div> Loading... </div>;
            if (error) return <div> Error Loading Product details. </div>;
            else {
              data.product.map((prod) => console.log(prod.name));
            }
          }}
        </Query>
      </div>
    );
  }
}

export default DescriptionPage;
