import { SET_BIKES } from "./actions";

const initialState = {
  bikes: [],
};

const bikesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BIKES:
      return {
        ...state,
        bikes: action.payload,
      };
    default:
      return state;
  }
};

export default bikesReducer;
