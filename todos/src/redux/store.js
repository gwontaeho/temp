import { createStore } from "redux";
import todosReducer from "./todos/reducer";

const store = createStore(todosReducer);

export default store;
