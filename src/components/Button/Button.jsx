import styles from "./Button.module.css";

const Button = ({ type, text }) => {
  return type === "submit" ? <button className={styles.button__submit}>{text}</button> : <button>{text}</button>;
};

export default Button;
