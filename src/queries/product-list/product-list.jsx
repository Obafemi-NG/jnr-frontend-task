import styles from "./product-list.module.css";

import { gql, useQuery } from "@apollo/client";

const PRODUCT_LIST = gql`
  query {
    categories {
      name
      products {
        id
        name
      }
    }
  }
`;

const ProductList = () => {
  const { loading, error, data } = useQuery(PRODUCT_LIST);
  if (error) return <h3> Error : {error.message} </h3>;
  if (loading) return <p>Loading</p>;
  const response = data.categories.products.map((product) => product.id);
  console.log(response);
  return <div></div>;
};

export default ProductList;
