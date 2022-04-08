import React from "react";
import styles from "./card.module.css";
import { withRouter } from "../../withRouter";
import { ReactComponent as Cart } from "../../assets/white-cart.svg";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleAddToCart = () => {
    this.props.navigate("/product");
  };

  render() {
    const { children } = this.props;
    return (
      <div className={styles.card}>
        {children}
        <span
          onClick={this.handleAddToCart}
          className={styles["add-to-cart-btn"]}
        >
          {" "}
          <Cart />{" "}
        </span>
      </div>
    );
  }
}

export default withRouter(Card);
