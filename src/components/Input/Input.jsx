import "./Input.css";
import React from "react";

const Input = (props) => {
  const { field, inputType, id, placeholder, onChange, stateData, isSubmitted } = props;
  const { value, setValue, isValid, isFilled, setValid, setFilled } = stateData;

  console.log(id);

  return (
    <>
      <label className="questionnaire__label" htmlFor={id}>
        {field}
      </label>
      <input
        className="questionnaire__input"
        value={value}
        onChange={(e) => {
          onChange({ e, id, setValue, setValid, setFilled });
        }}
        type={inputType}
        id={id}
        placeholder={placeholder}
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
};

export default Input;
