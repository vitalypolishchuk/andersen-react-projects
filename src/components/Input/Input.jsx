import styles from "./Input.module.css";
import React from "react";

const Input = ({ id, field, inputType, placeholder, value, setValue, isValid, isFilled, setValid, setFilled, onChange, isSubmitted }) => {
  return (
    <>
      <label className={styles.questionnaire__label} htmlFor={id}>
        {field}
      </label>
      <input
        className={styles.questionnaire__input}
        value={value}
        onChange={(e) => {
          onChange({ e, id, setValue, setValid, setFilled });
        }}
        type={inputType}
        id={id}
        placeholder={placeholder}
        autoComplete="off"
      />

      <div className={styles.questionnaire__errors}>
        <div className={isSubmitted && !isFilled ? styles.questionnaire__error : `${styles.questionnaire__error} ${styles.hidden}`}>
          Поле пустое. Заполните пожалуйста.
        </div>
        <div className={isSubmitted && value && !isValid ? styles.questionnaire__error : `${styles.questionnaire__error} ${styles.hidden}`}>
          Что-то пошло не так.
        </div>
      </div>
    </>
  );
};

export default Input;
