import "./Button.css";
import React from "react";

class Buttons extends React.Component {
  render() {
    const { text, type, handleCancel } = this.props;

    return (
      <button
        className={`questionnaire__button ${type === "button" ? "button-type-styles" : "submit-type-styles"}`}
        type={type}
        onClick={handleCancel}
      >
        {text}
      </button>
    );
  }
}

export default Buttons;
