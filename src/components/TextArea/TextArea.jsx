import styles from "./TextArea.module.css";
import React from "react";

const TextArea = React.memo(({ id, field, value, formError, onChange, isSubmitted, maxLength }) => {
  return (
    <>
      <label className={styles.questionnaire__label} htmlFor={id}>
        {field}
      </label>
      <textarea
        className={styles.questionnaire__textarea}
        value={value}
        onChange={(e) => {
          onChange({ e, id });
        }}
        id={id}
        rows="7"
      />
      <div className={styles.questionnaire__messages}>
        <div className={formError ? styles.hidden : styles.questionnaire__length}>
          <span>
            {value.length}/{maxLength}
          </span>
        </div>
        <div className={isSubmitted && formError ? styles.questionnaire__error : styles.hidden}>{formError}</div>
      </div>
    </>
  );
});

export default TextArea;
