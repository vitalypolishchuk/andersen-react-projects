import "./PopupMessages.css";
import React from "react";

class PopupMessages extends React.Component {
  render() {
    const { isShowSubmittedPopup, isShowCancelledPopup } = this.props;

    return (
      <>
        <div
          className={
            isShowSubmittedPopup ? "questionnaire__msg questionnaire__sent-color" : "questionnaire__msg questionnaire__sent-color hidden transparent"
          }
        >
          Данные отправлены!
        </div>
        <div
          className={
            isShowCancelledPopup
              ? "questionnaire__msg questionnaire__cancelled-color"
              : "questionnaire__msg questionnaire__cancelled-color hidden transparent"
          }
        >
          Операция отменена!
        </div>
      </>
    );
  }
}

export default PopupMessages;
