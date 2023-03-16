import "./TextArea.css";
import React from "react";

class TextArea extends React.Component {
  render() {
    const { field, id, onChange, value, isSubmitted, isValid, isFilled, validationName, fillingName, maxLength } = this.props;

    return (
      <>
        <label className="questionnaire__label" htmlFor={id}>
          {field}
        </label>
        <textarea
          className="questionnaire__textarea"
          value={value}
          onChange={(e) => {
            onChange({ e, id, fillingName, validationName });
          }}
          id={id}
          rows="7"
        />
        <div className="questionnaire__messages-container">
          <div className={(isSubmitted && !isValid) || (isSubmitted && !isFilled) ? "questionnaire__length hidden" : "questionnaire__length"}>
            <span>{value.length}</span>
            <span>/</span>
            <span>{maxLength}</span>
          </div>
          <div className={isSubmitted && !isFilled ? "questionnaire__error-empty" : "questionnaire__error-empty hidden"}>
            &#x2717; Поле пустое. Заполните пожалуйста.
          </div>
          <div className={isSubmitted && value && !isValid ? "questionnaire__error-not-valid" : "questionnaire__error-not-valid hidden"}>
            Превышен лимит символов в поле
          </div>
        </div>
      </>
    );
  }
}

export default TextArea;
