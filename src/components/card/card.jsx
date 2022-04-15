import React from "react";
import styles from "./card.module.css";

class Card extends React.Component {
  render() {
    const { children, inStock } = this.props;
    return (
      <div className={styles.card}>
        <div className={`${inStock ? styles["out-of-stock"] : null} `} />
        {children}
      </div>
    );
  }
}

export default Card;
