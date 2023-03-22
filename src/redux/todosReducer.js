import { ADD_COMPLETED_TODO, ADD_TODO, ADD_UNCOMPLETED_TODO, DELETE_TODO, RENAME_TODO } from "./types";

const initialState = {
  list: [],
  inProcess: 0,
  completed: 0,
};

export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        inProcess: state.inProcess + 1,
        list: [...state.list, action.payload],
      };

    case ADD_COMPLETED_TODO:
      // wrap code in the IIFE, to isolate variables
      return (() => {
        const { id } = action.payload;
        const findTodoIndex = state.list.findIndex((todo) => todo.id === id);
        const todoCopy = { ...state.list[findTodoIndex] };
        todoCopy.completed = true;
        if (findTodoIndex !== -1) {
          return {
            ...state,
            inProcess: state.inProcess - 1,
            completed: state.completed + 1,
            list: [...state.list.slice(0, findTodoIndex), todoCopy, ...state.list.slice(findTodoIndex + 1)],
          };
        }
        return state;
      })();

    case ADD_UNCOMPLETED_TODO:
      return (() => {
        const { id } = action.payload;
        const findTodoIndex = state.list.findIndex((todo) => todo.id === id);
        const todoCopy = { ...state.list[findTodoIndex] };
        todoCopy.completed = false;
        if (findTodoIndex !== -1) {
          return {
            ...state,
            inProcess: state.inProcess + 1,
            completed: state.completed - 1,
            list: [...state.list.slice(0, findTodoIndex), todoCopy, ...state.list.slice(findTodoIndex + 1)],
          };
        }
        return state;
      })();

    case DELETE_TODO:
      return (() => {
        const { id } = action.payload;
        const findTodoIndex = state.list.findIndex((todo) => todo.id === id);
        if (findTodoIndex !== -1) {
          if (state.list[findTodoIndex].completed === false) {
            return {
              ...state,
              inProcess: state.inProcess - 1,
              list: [...state.list.slice(0, findTodoIndex), ...state.list.slice(findTodoIndex + 1)],
            };
          } else {
            return {
              ...state,
              completed: state.completed - 1,
              list: [...state.list.slice(0, findTodoIndex), ...state.list.slice(findTodoIndex + 1)],
            };
          }
        }
        return state;
      })();

    case RENAME_TODO:
      return (() => {
        const { id, name } = action.payload;
        const findTodoIndex = state.list.findIndex((todo) => todo.id === id);
        const todoCopy = { ...state.list[findTodoIndex] };
        todoCopy.name = name;
        if (findTodoIndex !== -1) {
          return {
            ...state,
            list: [...state.list.slice(0, findTodoIndex), todoCopy, ...state.list.slice(findTodoIndex + 1)],
          };
        }
        return state;
      })();

    default:
      return state;
  }
};
