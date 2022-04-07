import React from "react";
import styles from "./card.module.css";
import { ReactComponent as Cart } from "../../assets/white-cart.svg";

class Card extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.card}>
        {children}

        <span className={styles["add-to-cart-btn"]}>
          {" "}
          <Cart />{" "}
        </span>
      </div>
    );
  }
}

export default Card;
