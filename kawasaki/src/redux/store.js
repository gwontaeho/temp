import { createStore, combineReducers } from "redux";
import bikesReducer from "./bikes/reducer";
import bikeReducer from "./bike/reducer";
import navReducer from "./nav/reducer";

const rootReducer = combineReducers({
  bikesReducer,
  bikeReducer,
  navReducer,
});

const store = createStore(rootReducer);

export default store;
