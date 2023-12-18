import { createStore, combineReducers } from "redux";

import modeReducer from "./mode/reducer";
import menuReducer from "./menu/reducer";

const rootReducer = combineReducers({
  mode: modeReducer,
  menu: menuReducer,
});

const store = createStore(rootReducer);

export default store;
