import styles from "./UserName.module.css";
import todoImg from "../../images/todo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editName } from "../../redux/actions";
import Button from "../Button/Button";

const UserName = () => {
  const [name, setName] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [warning, setWarning] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmit(true);

    if (!name) return;

    dispatch(editName(name));
    navigate("/todos");
  };

  useEffect(() => {
    if (isSubmit && name) {
      setWarning(false);
      return;
    }
    if (isSubmit && !name) {
      setWarning(true);
    }
  }, [isSubmit, name]);

  return (
    <div className={styles.container}>
      <div className={styles.logo__container}>
        <img src={todoImg} alt="logo" />
      </div>
      <h1 className={styles.header}>С возвращением!</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="name">
          Укажите имя
        </label>
        <input
          className={warning ? `${styles.input} ${styles.warning}` : styles.input}
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" text="Сохранить" />
      </form>
    </div>
  );
};

export default UserName;
