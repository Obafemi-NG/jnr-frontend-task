import React, { PureComponent } from "react";
import styles from "./currency-dropdown.module.css";
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";
import { CURRENCY_LIST } from "../../queries";
import CurrencyModal from "../currency-modal/currency-modal";
import { ChangeCurrency } from "../../redux/currency/currency.action";

class CurrencyDropdown extends PureComponent {
  render() {
    const { ChangeCurrency } = this.props;
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
                      <div
                        onClick={() => ChangeCurrency(curr.symbol)}
                        className={styles.currency}
                      >
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

const mapDispatchToProps = (dispatch) => ({
  ChangeCurrency: (currency) => dispatch(ChangeCurrency(currency)),
});

export default connect(null, mapDispatchToProps)(CurrencyDropdown);
