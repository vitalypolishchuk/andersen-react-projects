import styles from "./Popup.module.css";

interface PopupProps {
  text: string;
}

const Popup = ({ text }: PopupProps) => {
  return <div className={styles.popup}>{text}</div>;
};

export default Popup;
