import { createSelector } from "reselect";

const selectCurrency = (state) => state.currency;

export const selectCurrencyHidden = createSelector(
  [selectCurrency],
  (currency) => currency.hidden
);

export const selectChangeCurrency = createSelector(
  [selectCurrency],
  (currency) => currency.preferredCurrencyLabel
);
