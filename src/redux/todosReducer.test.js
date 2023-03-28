import { ADD_TODO, ADD_COMPLETED_TODO, ADD_UNCOMPLETED_TODO, DELETE_TODO, RENAME_TODO } from "./types";
import { todosReducer, initialState } from "./todosReducer";
import { addTodo, addCompletedTodo, addUncompleteTodo, deleteTodo, renameTodo } from "./actions";

const unCompletedState = {
  list: [{ name: "Vitalii", id: "12345", completed: false }],
  inProcess: 1,
  completed: 0,
};

const completedState = {
  list: [{ name: "Vitalii", id: "12345", completed: true }],
  inProcess: 0,
  completed: 1,
};

const renamedState = {
  list: [{ name: "Andrew", id: "12345", completed: false }],
  inProcess: 1,
  completed: 0,
};

const addTodoExpect = todosReducer(initialState, addTodo({ name: "Vitalii", id: "12345" }));

const addCompletedTodoExpect = todosReducer(unCompletedState, addCompletedTodo("12345"));

const addUncompletedTodoExpect = todosReducer(completedState, addUncompleteTodo("12345"));

const deleteTodoExpect = todosReducer(completedState, deleteTodo("12345"));

const renameTodoExpect = todosReducer(unCompletedState, renameTodo("12345", "Andrew"));

describe("todosReducer", () => {
  test(ADD_TODO, () => {
    expect(addTodoExpect).toEqual(unCompletedState);
  });

  test(ADD_COMPLETED_TODO, () => {
    expect(addCompletedTodoExpect).toEqual(completedState);
  });

  test(ADD_UNCOMPLETED_TODO, () => {
    expect(addUncompletedTodoExpect).toEqual(unCompletedState);
  });

  test(DELETE_TODO, () => {
    expect(deleteTodoExpect).toEqual(initialState);
  });

  test(RENAME_TODO, () => {
    expect(renameTodoExpect).toEqual(renamedState);
  });
});
