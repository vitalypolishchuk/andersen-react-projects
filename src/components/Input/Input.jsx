import styles from "./Input.module.css";
import React from "react";

class Input extends React.Component {
  render() {
    const { field, inputType, id, placeholder, onChange, value, isSubmitted, isValid, isFilled, validationName, fillingName } = this.props;

    return (
      <>
        <label className={styles.questionnaire__label} htmlFor={id}>
          {field}
        </label>
        <input
          className={styles.questionnaire__input}
          value={value}
          onChange={(e) => {
            onChange({ e, id, fillingName, validationName });
          }}
          type={inputType}
          id={id}
          placeholder={placeholder}
          ref={id === "phone" ? this.phoneRef : null}
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
  }
}

export default Input;
