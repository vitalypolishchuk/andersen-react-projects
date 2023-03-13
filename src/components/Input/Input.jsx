import "./Input.css";
import React from "react";

class Input extends React.Component {
  render() {
    const { field, inputType, id, placeholder, onChange, value } = this.props;

    return (
      <>
        <label className="questionnaire__label" htmlFor={id}>
          {field}
        </label>
        <input
          className="questionnaire__input"
          value={value}
          onChange={(e) => {
            onChange({ e, id });
          }}
          type={inputType}
          id={id}
          placeholder={placeholder}
          autoComplete="off"
          required
        />
      </>
    );
  }
}

export default Input;
