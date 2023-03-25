import styles from "./Popup.module.css";
import { PopupProps } from "./Popup.types";

const Popup = ({ text }: PopupProps) => {
  return <div className={styles.popup}>{text}</div>;
};

export default Popup;
