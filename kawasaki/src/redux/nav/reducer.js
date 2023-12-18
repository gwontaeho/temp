import { OPEN_NAV, CLOSE_NAV } from "./actions";

const initialState = {
  open: false,
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_NAV:
      return {
        ...state,
        open: true,
      };
    case CLOSE_NAV:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

export default navReducer;
