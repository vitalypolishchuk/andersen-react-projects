import styles from "./BigButton.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faCheck } from "@fortawesome/free-solid-svg-icons";

const BigButton = ({ type, text, link }) => {
  return (
    <Link to={link} className={type === "active" ? styles.active_tasks : styles.done_tasks}>
      {text}
      <span className={type === "active" ? styles.active__icon : styles.done__icon}>
        <FontAwesomeIcon icon={type === "active" ? faBullseye : faCheck} />
      </span>
    </Link>
  );
};

export default BigButton;
