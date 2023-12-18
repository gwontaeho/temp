import { SET_SCREEN } from "./actions";

const initialState = {
  current: 0,
};

const screenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREEN:
      return {
        ...state,
        current: action.payload,
      };

    default:
      return state;
  }
};

export default screenReducer;
