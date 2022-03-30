import React from "react";
import styles from "./navbar.module.css";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Cart } from "../../assets/cart.svg";
import { ReactComponent as Currency } from "../../assets/dollar-sign.svg";
import { ReactComponent as Dropdown } from "../../assets/angle-down.svg";
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
          <Currency />{" "}
          <span>
            {" "}
            <Dropdown />{" "}
          </span>
        </div>
        <div className={styles.icon}>
          <Cart />
        </div>
      </div>
    </div>
  );
};
