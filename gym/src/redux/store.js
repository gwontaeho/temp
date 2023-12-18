import { createStore, combineReducers } from "redux";
import dateReducer from "./date/reducer";
import screenReducer from "./screen/reducer";

const rootReducer = combineReducers({
  date: dateReducer,
  screen: screenReducer,
});

const store = createStore(rootReducer);

export default store;
