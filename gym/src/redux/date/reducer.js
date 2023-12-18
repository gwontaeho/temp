import { SET_DATE } from "./actions";

const initialState = {
  today: new Date(new Date().setHours(0, 0, 0, 0)),
  current: new Date(new Date().setHours(0, 0, 0, 0)),
};

const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE:
      return {
        ...state,
        current: action.payload,
      };

    default:
      return state;
  }
};

export default dateReducer;
