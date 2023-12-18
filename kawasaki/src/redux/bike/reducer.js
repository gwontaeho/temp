import { SET_BIKE, CLOSE_BIKE } from "./actions";

const initialState = {
  bike: {
    name: "",
    profile: "",
    images: [],
    dimensions: {
      전장: "",
      전폭: "",
      전고: "",
      휠베이스: "",
      최저지상고: "",
      시트높이: "",
      커브매스: "",
      연료탱크용량: "",
    },
    engine: {
      배기량: "",
    },
    performance: {
      최고출력: "",
      최대토크: "",
    },
  },
  open: false,
};

const bikeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BIKE:
      return {
        ...state,
        bike: action.payload,
        open: true,
      };
    case CLOSE_BIKE:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

export default bikeReducer;
