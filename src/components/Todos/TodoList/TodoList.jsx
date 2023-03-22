import styles from "./TodoList.module.css";
import { useSelector } from "react-redux";
import SingleTodo from "../SingleTodo/SingleTodo";

const TodoList = () => {
  const todos = useSelector(({ todos }) => todos);

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
