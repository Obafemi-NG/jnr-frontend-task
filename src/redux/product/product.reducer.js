import { productActionType } from "./product.type";
const INITIAL_STATE = {
  category: "all",
  attribute: "#FFFFFF" || "512GB" || 40,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productActionType.CHANGE_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case productActionType.CHANGE_ATTRIBUTE:
      return {
        ...state,
        attribute: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
