import styles from "./Form.module.css";
import { useState, useEffect, useRef } from "react";
import msgSvg from "../../images/msg.svg";
import { validateUpperCase, validateDate, validatePhone, validateWebsite, validateTextArea } from "../Validation/Validation";
import Input from "../Input/Input";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import PopupMessages from "../PopupMessages/PopupMessages";
import { inputData, textAreaData } from "./FormData";
import { initialState } from "./FormState";

const Form = () => {
  const svgContainer = useRef(null);
  const formRef = useRef(null);
  const resultRef = useRef(null);

  const [formState, setFormState] = useState(initialState);

  const handleCancel = () => {
    setFormState({ ...initialState, isShowCancelledPopup: true });
  };

  const handleSvgScroll = (e) => {
    formRef.current.scrollBy(e.deltaX, e.deltaY);
    resultRef.current.scrollBy(e.deltaX, e.deltaY);
  };

  useEffect(() => {
    // user should be able to scroll the form, even when scrolling on SVG
    const svgContainerRef = svgContainer.current;
    svgContainerRef.addEventListener("wheel", handleSvgScroll);

    return () => {
      svgContainerRef.removeEventListener("wheel", handleSvgScroll);
    };
  }, []);

  useEffect(() => {
    let timerId;

    if (formState.isShowCancelledPopup) {
      timerId = setTimeout(() => {
        setFormState((prevState) => ({ ...prevState, isShowCancelledPopup: false }));
      }, 5000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [formState.isShowCancelledPopup]);

  useEffect(() => {
    let timerId;

    if (formState.isShowSubmittedPopup) {
      timerId = setTimeout(() => {
        setFormState((prevState) => ({ ...prevState, isShowSubmittedPopup: false }));
      }, 5000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [formState.isShowSubmittedPopup]);

  const validate = ({ id, value }) => {
    // remove spaces from the beginning and the end
    const trimmedValue = value.trim();

    if (trimmedValue === "") return "Поле не заполнено";

    let isValid;

    switch (id) {
      case "name":
      case "surname":
        isValid = validateUpperCase(trimmedValue);
        break;
      case "birthday":
        isValid = validateDate(trimmedValue);
        break;
      case "phone":
        isValid = validatePhone(trimmedValue);
        break;
      case "website":
        isValid = validateWebsite(trimmedValue);
        break;
      case "aboutMe":
      case "technologies":
      case "lastProject":
        isValid = validateTextArea(trimmedValue, formState.textAreaMaxLength);
        break;
    }

    if (!isValid) return "Что-то пошло не так";
  };

  const phoneMask = ({ id, value }) => {
    const patterns = {
      removeLetters: /\D/g,
      addHyphen: /^(\d)/,
      addHyphen2: /^(\d)-(\d{4})/,
      addHyphen3: /^(\d)-(\d{4})-(\d{2})/,
    };

    const newValue = value
      .replace(patterns.removeLetters, "")
      .replace(patterns.addHyphen, "$1-")
      .replace(patterns.addHyphen2, "$1-$2-")
      .replace(patterns.addHyphen3, "$1-$2-$3-");

    return newValue;
  };

  const onChange = ({ e, id }) => {
    let value = e.target.value;

    if (id === "phone") {
      value = phoneMask({ id, value });
    }
    setFormState({ ...formState, fields: { ...formState.fields, [id]: value } });

    if (formState.isSubmitted) {
      const err = validate({ id, value });
      setFormState({ ...formState, formErrors: { ...formState.formErrors, [id]: err }, fields: { ...formState.fields, [id]: value } });
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    let allValuesValidAndFilled;
    let formErrorsNew = { ...formState.formErrors };

    for (let [id, value] of Object.entries(formState.fields)) {
      const err = validate({ id, value });
      formErrorsNew[id] = err;

      if (allValuesValidAndFilled !== false) {
        if (err === "" || err === undefined) {
          allValuesValidAndFilled = true;
        } else {
          allValuesValidAndFilled = false;
        }
      }
    }

    setFormState({ ...formState, formErrors: formErrorsNew, isSubmitted: true });

    if (allValuesValidAndFilled) {
      setFormState({ ...formState, isShowSubmittedPopup: true, isShowResult: true });
    }
  };

  return (
    <div className="App">
      <div className={styles.questionnaire}>
        <p className={styles.questionnaire__title}>{formState.isShowResult ? "Результат" : "Создание анкеты"}</p>
        <form ref={formRef} className={formState.isShowResult ? styles.none : styles.questionnaire__form} onSubmit={handleSubmit}>
          {inputData.map((input) => {
            return (
              <Input
                key={input.id}
                {...input}
                value={formState.fields[input.id]}
                formError={formState.formErrors[input.id]}
                onChange={onChange}
                isSubmitted={formState.isSubmitted}
              />
            );
          })}
          {textAreaData.map((textArea) => {
            return (
              <TextArea
                key={textArea.id}
                {...textArea}
                value={formState.fields[textArea.id]}
                formError={formState.formErrors[textArea.id]}
                onChange={onChange}
                isSubmitted={formState.isSubmitted}
                maxLength={formState.textAreaMaxLength}
              />
            );
          })}
          <div className={styles.questionnaire__buttons}>
            <Button text="Отменить" type="button" handleCancel={handleCancel} />
            <Button text="Отправить" type="submit" />
          </div>
        </form>
        <div ref={resultRef} className={formState.isShowResult ? styles.questionnaire__results : styles.none}>
          {inputData.map(({ id, field }) => {
            return (
              <div className={styles.questionnaire__result} key={id}>
                {field}: {formState.fields[id]}
              </div>
            );
          })}
          {textAreaData.map(({ id, field }) => {
            return (
              <div className={styles.questionnaire__result} key={id}>
                {field}: {formState.fields[id]}
              </div>
            );
          })}
          <Button text="Отменить" type="button" handleCancel={handleCancel} />
        </div>
        <span ref={svgContainer} className={styles.questionnaire__svg}>
          <img src={msgSvg} alt="Your SVG" />
        </span>
        <PopupMessages isShowSubmittedPopup={formState.isShowSubmittedPopup} isShowCancelledPopup={formState.isShowCancelledPopup} />
      </div>
    </div>
  );
};

export default Form;
