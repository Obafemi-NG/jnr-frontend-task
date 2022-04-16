import { createSelector } from "reselect";

const selectProduct = (state) => state.product;

const selectCategory = createSelector(
  [selectProduct],
  (product) => product.category
);
