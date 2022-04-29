import { createSelector } from "reselect";

const selectAttribute = (state) => state.attribute;

export const selectCartAttribute = createSelector(
  [selectAttribute],
  (attribute) => attribute.attributes
);
