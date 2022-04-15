import React from "react";

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { addItem } from "../../redux/cart/cart.action";

class ProductListPage extends React.Component {
  render() {
    return <div></div>;
  }
}

const GET_PRODUCT_DATA = gql`
  {
    categories {
      name
      products {
        id
        name
        brand
        inStock
        gallery
        prices {
          amount
          currency {
            symbol
            label
          }
        }
        attributes {
          type
          name
          items {
            value
            displayValue
            id
          }
        }
      }
    }
  }
`;

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItem(item)),
});

export default graphql(GET_PRODUCT_DATA)(
  connect(mapStateToProps, mapDispatchToProps)(ProductListPage)
);
