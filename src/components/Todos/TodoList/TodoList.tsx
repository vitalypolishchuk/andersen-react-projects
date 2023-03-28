import styles from "./TodoList.module.css";
import { AppState } from "../../../AppState.types";
import { useSelector } from "react-redux";
import SingleTodo from "../SingleTodo/SingleTodo";

const TodoList = () => {
  const todos = useSelector(({ todos }: AppState) => todos);

  return (
    <div className={styles.container}>
      {todos.list &&
        todos.list
          .slice()
          .reverse()
          .map(({ name, id, completed }) => {
            return <SingleTodo key={id} name={name} id={id} completed={completed} />;
          })}
    </div>
  );
};

export default TodoList;
