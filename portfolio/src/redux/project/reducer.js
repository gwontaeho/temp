import { SET_PROJECT, CLOSE_PROJECT } from "./actions";

const initialState = {
  open: false,
  current: {},
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT:
      return {
        ...state,
        open: true,
        current: action.payload,
      };
    case CLOSE_PROJECT:
      return {
        ...state,
        open: false,
      };

    default:
      return state;
  }
};

export default projectReducer;
