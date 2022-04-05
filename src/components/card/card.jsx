import React from "react";
import styles from "./card.module.css";

class Card extends React.Component {
  render() {
    const { children } = this.props;
    return <div className={styles.card}>{children}</div>;
  }
}

export default Card;
