import styles from "./Input.module.css";
import React from "react";

const Input = ({ id, field, inputType, placeholder, value, formError, onChange, isSubmitted }) => {
  return (
    <>
      <label className={styles.questionnaire__label} htmlFor={id}>
        {field}
      </label>

      <input
        className={styles.questionnaire__input}
        value={value}
        onChange={(e) => {
          onChange({ e, id });
        }}
        type={inputType}
        id={id}
        placeholder={placeholder}
        autoComplete="off"
      />

      <div className={styles.questionnaire__errors}>
        <div className={isSubmitted && formError ? styles.questionnaire__error : styles.hidden}>{formError}</div>
      </div>
    </>
  );
};

export default Input;
