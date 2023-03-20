import styles from "./TextArea.module.css";
import React from "react";

class TextArea extends React.Component {
  render() {
    const { field, id, onChange, value, isSubmitted, isValid, isFilled, validationName, fillingName, maxLength } = this.props;

    return (
      <>
        <label className={styles.questionnaire__label} htmlFor={id}>
          {field}
        </label>
        <textarea
          className={styles.questionnaire__textarea}
          value={value}
          onChange={(e) => {
            onChange({ e, id, fillingName, validationName });
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
            <span>
              {value.length}/{maxLength}
            </span>
          </div>
          <div className={isSubmitted && !isFilled ? styles.questionnaire__error : `${styles.questionnaire__error} ${styles.hidden}`}>
            Поле пустое. Заполните пожалуйста.
          </div>
          <div className={isSubmitted && value && !isValid ? styles.questionnaire__error : `${styles.questionnaire__error} ${styles.hidden}`}>
            Превышен лимит символов в поле
          </div>
        </div>
      </>
    );
  }
}

export default TextArea;
