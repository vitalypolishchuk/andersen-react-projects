import styles from "./TextArea.module.css";
import React from "react";

const TextArea = ({ id, field, value, setValue, isValid, isFilled, setValid, setFilled, onChange, isSubmitted, maxLength }) => {
  return (
    <>
      <label className={styles.questionnaire__label} htmlFor={id}>
        {field}
      </label>
      <textarea
        className={styles.questionnaire__textarea}
        value={value}
        onChange={(e) => {
          onChange({ e, id, setValue, setValid, setFilled });
        }}
        id={id}
        rows="7"
      />
      <div className={styles.questionnaire__messages}>
        <div
          className={
            (isSubmitted && !isValid) || (isSubmitted && !isFilled)
              ? `${styles.questionnaire__length} ${styles.hidden}`
              : styles.questionnaire__length
          }
        >
          <span>{value.length}</span>
          <span>/</span>
          <span>{maxLength}</span>
        </div>
        <div className={isSubmitted && !isFilled ? styles.questionnaire__error : `${styles.questionnaire__error} ${styles.hidden}`}>
          &#x2717; Поле пустое. Заполните пожалуйста.
        </div>
        <div className={isSubmitted && value && !isValid ? styles.questionnaire__error : `${styles.questionnaire__error} ${styles.hidden}`}>
          Превышен лимит символов в поле
        </div>
      </div>
    </>
  );
};

export default TextArea;
