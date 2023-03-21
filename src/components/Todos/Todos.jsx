import styles from "./Todos.module.css";
import BigButton from "../BigButton/BigButton";
import CreateTodo from "./CreateTodo/CreateTodo";

const Todo = () => {
  return (
    <div className={styles.main_container}>
      <h2 className={styles.header}>С возвращением, Vitalii</h2>
      <div className={styles.tasks_container}>
        <BigButton type="active" text="Активные задачи" />
        <BigButton type="done" text="Готовые задачи" />
      </div>
      <CreateTodo />
    </div>
  );
};

export default Todo;
