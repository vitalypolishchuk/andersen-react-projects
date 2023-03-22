import { EDIT_NAME, ADD_TODO, ADD_COMPLETED_TODO, ADD_UNCOMPLETED_TODO, DELETE_TODO, RENAME_TODO } from "./types";

export const editName = (name) => {
  return { type: EDIT_NAME, payload: name };
};

export const addTodo = ({ name, id }) => {
  return { type: ADD_TODO, payload: { name, id, completed: false } };
};

export const addCompletedTodo = (id) => {
  return { type: ADD_COMPLETED_TODO, payload: { id } };
};

export const addUncompleteTodo = (id) => {
  return { type: ADD_UNCOMPLETED_TODO, payload: { id } };
};

export const deleteTodo = (id) => {
  return { type: DELETE_TODO, payload: { id } };
};

export const renameTodo = (id, name) => {
  return { type: RENAME_TODO, payload: { id, name } };
};
