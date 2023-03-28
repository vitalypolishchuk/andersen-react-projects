import styles from "./SingleTodo.module.css";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faCheck, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { addCompletedTodo, addUncompleteTodo, deleteTodo, renameTodo } from "../../../redux/actions";
import { useState } from "react";

interface SingleTodoProps {
  name: string;
  id: string;
  completed: boolean;
}

const SingleTodo = ({ name, id, completed }: SingleTodoProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newTodoName, setNewTodoName] = useState<string>(name);
  const dispatch = useDispatch();

  const HandleComplete = () => {
    dispatch(addCompletedTodo(id));
  };

  const handleUncomplete = () => {
    dispatch(addUncompleteTodo(id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleRename = () => {
    if (newTodoName === "") {
      setIsEdit(false);
      return;
    }
    dispatch(renameTodo(id, newTodoName));
    setIsEdit(false);
  };

  return (
    <div className={`${styles.container} ${completed ? styles.container_completed : styles.container_inprocess}`}>
      <button className={completed ? styles.none : styles.round} onClick={HandleComplete}>
        <span className={styles.round_small}></span>
      </button>
      <button className={completed ? styles.check : styles.none} onClick={handleUncomplete}>
        <FontAwesomeIcon icon={faCheck} />
      </button>
      <span className={isEdit ? styles.none : completed ? styles.name_completed : styles.name_inprogress}>{name}</span>
      <input type="text" value={newTodoName} onChange={(e) => setNewTodoName(e.target.value)} className={isEdit ? styles.input : styles.none} />
      <button className={isEdit ? styles.none : `${styles.icon} ${styles.edit_icon}`} onClick={handleEdit}>
        <FontAwesomeIcon icon={faPen} />
      </button>
      <button className={isEdit ? styles.none : `${styles.icon} ${styles.delete_icon}`} onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <button className={isEdit ? `${styles.icon} ${styles.submit_icon}` : styles.none} onClick={handleRename}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
};

export default SingleTodo;
