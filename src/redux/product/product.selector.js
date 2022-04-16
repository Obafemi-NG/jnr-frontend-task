import { createSelector } from "reselect";

const selectProduct = (state) => state.product;

export const selectCategory = createSelector(
  [selectProduct],
  (product) => product.category
);
