export const initialState = {
  user: null,
  cart: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user
      }

    case "SET_CART":
      return {
        ...state,
        cart: action.cart
      }

    default:
      return state;
  }
};

export default reducer;