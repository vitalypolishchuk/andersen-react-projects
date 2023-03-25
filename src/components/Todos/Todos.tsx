import styles from "./Todos.module.css";
import { AppState } from "../../AppState.types";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import BigButton from "../BigButton/BigButton";
import CreateTodo from "./CreateTodo/CreateTodo";
import NumberTodo from "./NumberTodo/NumberTodo";
import TodoList from "./TodoList/TodoList";
import Popup from "../Popup/Popup";

const Todo = () => {
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const name = useSelector(({ name }: AppState) => name);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    if (isShowPopup) {
      timerId = setTimeout(() => {
        setIsShowPopup(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isShowPopup]);

  return (
    <div className={styles.main_container}>
      <h2 className={styles.header}>С возвращением, {name}</h2>
      <NumberTodo />
      <div className={styles.tasks_container}>
        <BigButton type="active" text="Активные задачи" link="/todos/inprocess" />
        <BigButton type="done" text="Готовые задачи" link="/todos/completed" />
      </div>
      <CreateTodo setIsShowPopup={setIsShowPopup} />
      <TodoList />
      <div className={isShowPopup ? styles.popup_container : `${styles.transparent} ${styles.none}`}>
        <Popup text="Задание создано" />
      </div>
    </div>
  );
};

export default Todo;
