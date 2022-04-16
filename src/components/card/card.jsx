import React from "react";
import styles from "./card.module.css";

class Card extends React.Component {
  render() {
    const { children, inStock } = this.props;
    return (
      <div
        className={`${styles.card} ${
          inStock ? null : styles["card-out-of-stock"]
        } `}
      >
        <div className={`${inStock ? null : styles["out-of-stock"]} `} />
        {children}
      </div>
    );
  }
}

export default Card;
