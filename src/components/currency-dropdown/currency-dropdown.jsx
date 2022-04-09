import React from "react";
import styles from "./currency-dropdown.module.css";
import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import CurrencyModal from "../currency-modal/currency-modal";

class CurrencyDropdown extends React.Component {
  render() {
    const CURRENCY_LIST = gql`
      {
        currencies {
          label
          symbol
        }
      }
    `;
    return (
      <Query query={CURRENCY_LIST}>
        {({ loading, error, data }) => {
          if (loading) return <div> Loading... </div>;
          if (error) return <div> Error fetching Currency. </div>;
          else {
            const currency = data.currencies.map((currency) => currency);
            return (
              <CurrencyModal>
                {currency.map((curr) => {
                  return (
                    <div key={curr.symbol} className={styles.currencies}>
                      <div className={styles.currency}>
                        <span className={styles.symbol}> {curr.symbol} </span>
                        <span className={styles.label}> {curr.label} </span>
                      </div>
                    </div>
                  );
                })}
              </CurrencyModal>
            );
          }
        }}
      </Query>
    );
  }
}

export default CurrencyDropdown;
