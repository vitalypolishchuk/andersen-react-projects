import "./Button.css";
import React from "react";

const Buttons = (props) => {
  const { text, type, handleCancel } = props;

  return (
    <button className={`questionnaire__button ${type === "button" ? "button-type-styles" : "submit-type-styles"}`} type={type} onClick={handleCancel}>
      {text}
    </button>
  );
};

export default Buttons;
