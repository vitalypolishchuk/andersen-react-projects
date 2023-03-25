import styles from "./Button.module.css";
import { ButtonProps } from "./Button.types";

const Button = ({ type, text }: ButtonProps) => {
  return type === "submit" ? <button className={styles.button__submit}>{text}</button> : <button>{text}</button>;
};

export default Button;
