import { SET_DARK, SET_LIGHT } from "./actions";

const initialState = {
  dark: false,
};

const modeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DARK:
      return {
        ...state,
        dark: true,
      };
    case SET_LIGHT:
      return {
        ...state,
        dark: false,
      };
    default:
      return state;
  }
};

export default modeReducer;
