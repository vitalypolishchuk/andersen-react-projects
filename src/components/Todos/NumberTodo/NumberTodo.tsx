import styles from "./NumberTodo.module.css";
import { AppState } from "../../../AppState.types";
import { useSelector } from "react-redux";

const NumberTodo = () => {
  const todos = useSelector(({ todos }: AppState) => todos);
  const { list, inProcess, completed } = todos;

  return (
    <ul className={styles.container}>
      <li className={styles.container_inner}>
        <span className={styles.name}>Осталось</span>
        <span className={styles.number}>{inProcess}</span>
      </li>
      <li className={styles.container_inner}>
        <span className={styles.name}>Выполнено</span>
        <span className={styles.number}>{completed}</span>
      </li>
      <li className={styles.container_inner}>
        <span className={styles.name}>Всего</span>
        <span className={styles.number}>{list.length}</span>
      </li>
    </ul>
  );
};

export default NumberTodo;
