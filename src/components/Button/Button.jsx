import styles from "./Button.module.css";
import React from "react";

const Buttons = (props) => {
  const { text, type, handleCancel } = props;

  return (
    <button
      className={`${styles.questionnaire__button} ${type === "button" ? styles.normal__button : styles.submit__button}`}
      type={type}
      onClick={handleCancel}
    >
      {text}
    </button>
  );
};

export default Buttons;
