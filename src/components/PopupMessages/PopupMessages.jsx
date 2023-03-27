import styles from "./PopupMessages.module.css";
import React from "react";

const PopupMessages = (props) => {
  const { isShowSubmittedPopup, isShowCancelledPopup } = props;

  return (
    <>
      <div className={isShowSubmittedPopup ? styles.questionnaire__sent : `${styles.hidden} ${styles.transparent}`}>Данные отправлены!</div>
      <div className={isShowCancelledPopup ? styles.questionnaire__cancel : `${styles.hidden} ${styles.transparent}`}>Операция отменена!</div>
    </>
  );
};

export default PopupMessages;
