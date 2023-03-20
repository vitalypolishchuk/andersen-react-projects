import styles from "./Button.module.css";
import React from "react";

class Buttons extends React.Component {
  render() {
    const { text, type, handleCancel } = this.props;

    return (
      <button
        className={`${styles.questionnaire__button} ${type === "button" ? styles.normal__button : styles.submit__button}`}
        type={type}
        onClick={handleCancel}
      >
        {text}
      </button>
    );
  }
}

export default Buttons;
