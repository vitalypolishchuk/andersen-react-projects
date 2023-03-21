import styles from "./BigButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faCheck } from "@fortawesome/free-solid-svg-icons";

const BigButton = ({ type, text }) => {
  return (
    <button className={type === "active" ? styles.active_tasks : styles.done_tasks}>
      {text}
      <span className={type === "active" ? styles.active__icon : styles.done__icon}>
        <FontAwesomeIcon icon={type === "active" ? faBullseye : faCheck} />
      </span>
    </button>
  );
};

export default BigButton;
