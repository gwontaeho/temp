import { createStore, combineReducers } from "redux";

import menuReducer from "./menu/reducer";

const rootReducer = combineReducers({
  menu: menuReducer,
});

const store = createStore(rootReducer);

export default store;
