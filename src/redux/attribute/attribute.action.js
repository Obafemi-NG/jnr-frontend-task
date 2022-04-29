import { attributeActionType } from "./attribute.type";

export const addAttribute = (attribute) => ({
  type: attributeActionType.ADD_ATTRIBUTE,
  payload: attribute,
});

export const resetAttribute = () => ({
  type: attributeActionType.RESET_INITIAL_STATE,
});
