import React from "react";
import styles from "./navbar.module.css";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Cart } from "../../assets/cart.svg";
import { ReactComponent as Angledown } from "../../assets/angle-down.svg";
import CartIcon from "../cart-icon/cart-icon";
// import { ReactComponent as Angleup } from "../../assets/angle-up.svg";

export const Navbar = () => {
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
          {/* <Currency />{" "} */}$
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
};
