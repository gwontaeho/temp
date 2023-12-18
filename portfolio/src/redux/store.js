import { createStore, combineReducers } from "redux";

import screenReducer from "./screen/reducer";
import projectReducer from "./project/reducer";

const rootReducer = combineReducers({
  screen: screenReducer,
  project: projectReducer,
});

const store = createStore(rootReducer);

export default store;
