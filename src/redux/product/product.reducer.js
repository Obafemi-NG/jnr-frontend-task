import { productActionType } from "./product.type";
const INITIAL_STATE = {
  category: "all",
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productActionType.CHANGE_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
