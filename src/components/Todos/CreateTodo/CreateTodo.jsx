import styles from "./CreateTodo.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const CreateTodo = () => {
  const [todo, setTodo] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [warning, setWarning] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!todo) return;
  };

  useEffect(() => {
    if (isSubmitted && todo) {
      setWarning(false);
      return;
    }
    if (isSubmitted && !todo) {
      setWarning(true);
    }
  }, [isSubmitted, todo]);

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <label htmlFor="todo" className={styles.label}>
        Создать TODO
      </label>
      <div className={styles.input_container}>
        <input
          type="text"
          id="todo"
          className={warning ? `${styles.input} ${styles.warning}` : styles.input}
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className={todo ? `${styles.icon} ${styles.blue}` : styles.icon}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </form>
  );
};

export default CreateTodo;
