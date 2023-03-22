import styles from "./Popup.module.css";

const Popup = ({ text }) => {
  return <div className={styles.popup}>{text}</div>;
};

export default Popup;
