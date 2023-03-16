import "./Input.css";
import React from "react";

class Input extends React.Component {
  render() {
    const { field, inputType, id, placeholder, onChange, value, isSubmitted, isValid, isFilled, validationName, fillingName } = this.props;

    return (
      <>
        <label className="questionnaire__label" htmlFor={id}>
          {field}
        </label>
        <input
          className="questionnaire__input"
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

        <div className="questionnaire__errors">
          <div className={isSubmitted && !isFilled ? "questionnaire__error-empty" : "questionnaire__error-empty hidden"}>
            &#x2717; Поле пустое. Заполните пожалуйста.
          </div>
          <div className={isSubmitted && value && !isValid ? "questionnaire__error-not-valid" : "questionnaire__error-not-valid hidden"}>
            Что-то пошло не так.
          </div>
        </div>
      </>
    );
  }
}

export default Input;
