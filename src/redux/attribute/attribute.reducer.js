import { attributeActionType } from "./attribute.type";

const INITIAL_STATE = {
  attributes: {},
};

export const attributeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case attributeActionType.ADD_ATTRIBUTE:
      return {
        ...state,
        attributes: { ...state.attributes, ...action.payload },
      };
    case attributeActionType.RESET_INITIAL_STATE:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
