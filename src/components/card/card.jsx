import React from "react";
import styles from "./card.module.css";
import { connect } from "react-redux";
import { ReactComponent as Cart } from "../../assets/white-cart.svg";
import { addItem } from "../../redux/cart/cart.action";

class Card extends React.Component {
  render() {
    const { children, addItemToCart } = this.props;
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

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(Card);
