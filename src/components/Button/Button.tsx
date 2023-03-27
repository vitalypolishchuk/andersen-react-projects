import styles from "./Button.module.css";

interface ButtonProps {
  type: string;
  text: string;
}

const Button = ({ type, text }: ButtonProps) => {
  return type === "submit" ? <button className={styles.button__submit}>{text}</button> : <button>{text}</button>;
};

export default Button;
