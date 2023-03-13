import "./TextArea.css";
import React from "react";

class TextArea extends React.Component {
  render() {
    const { field, id, onChange, value } = this.props;

    return (
      <>
        <label className="questionnaire__label" htmlFor={id}>
          {field}
        </label>
        <textarea
          className="questionnaire__textarea"
          value={value}
          onChange={(e) => {
            onChange({ e, id });
          }}
          id={id}
          rows="7"
          required
        />
      </>
    );
  }
}

export default TextArea;
