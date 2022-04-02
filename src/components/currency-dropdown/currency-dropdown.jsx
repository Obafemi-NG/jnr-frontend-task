import React from "react";
import styles from "./currency-dropdown.module.css";
import CurrencyModal from "../currency-modal/currency-modal";

class CurrencyDropdown extends React.Component {
  render() {
    return (
      <CurrencyModal>
        <div className={styles.currencies}>
          <span>$ USD</span>
          <span>£ PND</span>
          <span>€ EUR</span>
        </div>
      </CurrencyModal>
    );
  }
}

export default CurrencyDropdown;
