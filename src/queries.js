import { gql } from "@apollo/client";

export const PRODUCT_DETAILS = (productId) => gql`
      query {
        product( id: ${JSON.stringify(productId)}) {
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

export const Product_lists = gql`
  query fetchProducts {
    categories {
      name
      products {
        id
        name
        brand
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

export const GET_LINKS = gql`
  {
    categories {
      name
    }
  }
`;

export const CURRENCY_LIST = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;
