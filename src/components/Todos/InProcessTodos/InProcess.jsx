import styles from "./InProcessTodos.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SingleTodo from "../SingleTodo/SingleTodo";

const InProcessTodos = () => {
  const todos = useSelector(({ todos }) => todos);
  const { list, inProcess } = todos;

  return (
    <div className={styles.main_container}>
      <h2>{inProcess > 0 ? `Vitalii, вам предстоит выполнить ${inProcess} ${inProcess === 1 ? "задачу" : "задач(и)"}` : `Все задачи выполнены!`}</h2>
      <div className={styles.container}>
        {list &&
          list
            .slice()
            .reverse()
            .filter((todo) => todo.completed === false)
            .map(({ name, id, completed }) => {
              return <SingleTodo key={id} name={name} id={id} completed={completed} />;
            })}
      </div>
      <Link to="/todos" className={styles.back_button}>
        Вернуться
      </Link>
    </div>
  );
};

export default InProcessTodos;
