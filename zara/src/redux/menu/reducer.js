import { OPEN_MENU, CLOSE_MENU, SET_NAV } from "./actions";

const initialState = {
  open: false,
  nav: null,
  category: null,
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MENU:
      return {
        ...state,
        open: true,
      };
    case CLOSE_MENU:
      return {
        ...state,
        open: false,
      };
    case SET_NAV:
      return {
        ...state,
        nav: state.nav === action.payload ? null : action.payload,
      };
    default:
      return state;
  }
};

export default menuReducer;
