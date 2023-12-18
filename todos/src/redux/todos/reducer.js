import { ADD_TODO, REMOVE_TODO, CHECK_TODO } from "./actions";

const initialState = {
  todos: [],
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, { ...action.payload, check: false }],
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: [...state.todos].filter((todo) => todo.id !== action.payload),
      };
    case CHECK_TODO:
      return {
        ...state,
        todos: [...state.todos].map((todo) =>
          todo.id === action.payload ? { ...todo, check: !todo.check } : todo
        ),
      };
    default:
      return state;
  }
};

export default todosReducer;
