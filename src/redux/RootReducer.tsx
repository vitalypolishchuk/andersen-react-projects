import { combineReducers } from "redux";
import { nameReducer } from "./nameReducer";
import { todosReducer } from "./todosReducer";

export const rootReducer = combineReducers({
  name: nameReducer,
  todos: todosReducer,
});
