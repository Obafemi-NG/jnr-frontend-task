import React from "react";
import styles from "./header.module.css";

import CartIcon from "../cart-icon/cart-icon";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Angledown } from "../../assets/angle-down.svg";
// import { ReactComponent as Angleup } from "../../assets/angle-up.svg";

class Header extends React.Component {
  render() {
    return (
      <div className={styles["navbar"]}>
        <div className={styles["link-container"]}>
          <div className={styles["category-link"]}>WOMEN</div>
          <div className={styles["category-link"]}>MEN</div>
          <div className={styles["category-link"]}>KIDS</div>
        </div>
        <div className={styles["icon-container"]}>
          <Logo />
        </div>
        <div className={styles["navbar-left"]}>
          <div className={styles.icon}>
            $
            <span className={styles["angle-icon"]}>
              {" "}
              <Angledown />{" "}
            </span>
          </div>
          <div className={styles.icon}>
            <CartIcon />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
