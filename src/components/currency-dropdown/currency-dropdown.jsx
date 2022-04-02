import React from "react";
import styles from "./currency-dropdown.module.css";
import CurrencyModal from "../currency-modal/currency-modal";

class CurrencyDropdown extends React.Component {
  render() {
    return (
      <CurrencyModal>
        <div className={styles.currencies}>
          <div className={styles.currency}>$ USD</div>
          <div className={styles.currency}>£ PND</div>
          <div className={styles.currency}>€ EUR</div>
        </div>
      </CurrencyModal>
    );
  }
}

export default CurrencyDropdown;
