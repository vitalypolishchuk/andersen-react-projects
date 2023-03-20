import styles from "./Form.module.css";
import { useState, useEffect, useRef } from "react";
import msgSvg from "../../images/msg.svg";
import { validateUpperCase, validateDate, validatePhone, validateWebsite, validateTextArea } from "../Validation/Validation";
import Input from "../Input/Input";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import PopupMessages from "../PopupMessages/PopupMessages";

const Form = () => {
  const svgContainer = useRef(null);
  const formRef = useRef(null);
  const resultRef = useRef(null);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [lastProject, setLastProject] = useState("");

  // if Valid is TRUE it means that the value is VALID
  const [isNameValid, setIsNameValid] = useState(false);
  const [isSurnameValid, setIsSurnameValid] = useState(false);
  const [isBirthdayValid, setIsBirthdayValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isWebsiteValid, setIsWebsiteValid] = useState(false);
  const [isAboutMeValid, setIsAboutMeValid] = useState(false);
  const [isTechnologiesValid, setIsTechnologiesValid] = useState(false);
  const [isLastProjectValid, setIsLastProjectValid] = useState(false);

  // If Filled is TRUE it means that the value is NOT empty
  const [isNameFilled, setIsNameFilled] = useState(false);
  const [isSurnameFilled, setIsSurnameFilled] = useState(false);
  const [isBirthdayFilled, setIsBirthdayFilled] = useState(false);
  const [isPhoneFilled, setIsPhoneFilled] = useState(false);
  const [isWebsiteFilled, setIsWebsiteFilled] = useState(false);
  const [isAboutMeFilled, setIsAboutMeFilled] = useState(false);
  const [isTechnologiesFilled, setIsTechnologiesFilled] = useState(false);
  const [isLastProjectFilled, setIsLastProjectFilled] = useState(false);

  const [textAreaMaxLength, setTextAreaMaxLength] = useState(600);

  // if the form is cancelled, show popup
  const [isShowCancelledPopup, setIsShowCancelledPopup] = useState(false);
  // if the form is submitted, show popup
  const [isShowSubmittedPopup, setIsShowSubmittedPopup] = useState(false);

  // isSubmitted is TRUE once the user clicks on "SUBMIT" button, but it does not mean that the fields are valid or filled
  const [isSubmitted, setIsSubmitted] = useState(false);
  // show result of the submit
  const [isShowResult, setIsShowResult] = useState(false);

  const inputData = [
    {
      id: "name",
      field: "Имя",
      inputType: "text",
      placeholder: "Иван",
      value: name,
      setValue: setName,
      isValid: isNameValid,
      isFilled: isNameFilled,
      setValid: setIsNameValid,
      setFilled: setIsNameFilled,
    },
    {
      id: "surname",
      field: "Фамилия",
      inputType: "text",
      placeholder: "Иваненко",
      value: surname,
      setValue: setSurname,
      isValid: isSurnameValid,
      isFilled: isSurnameFilled,
      setValid: setIsSurnameValid,
      setFilled: setIsSurnameFilled,
    },
    {
      id: "birthday",
      field: "Дата Рождения",
      inputType: "date",
      placeholder: "",
      value: birthday,
      setValue: setBirthday,
      isValid: isBirthdayValid,
      isFilled: isBirthdayFilled,
      setValid: setIsBirthdayValid,
      setFilled: setIsBirthdayFilled,
    },
    {
      id: "phone",
      field: "Телефон",
      inputType: "text",
      placeholder: "+123456789",
      value: phone,
      setValue: setPhone,
      isValid: isPhoneValid,
      isFilled: isPhoneFilled,
      setValid: setIsPhoneValid,
      setFilled: setIsPhoneFilled,
    },
    {
      id: "website",
      field: "Сайт",
      inputType: "text",
      placeholder: "https://localhost:3000",
      value: website,
      setValue: setWebsite,
      isValid: isWebsiteValid,
      isFilled: isWebsiteFilled,
      setValid: setIsWebsiteValid,
      setFilled: setIsWebsiteFilled,
    },
  ];

  const textAreaData = [
    {
      id: "aboutMe",
      field: "О себе",
      value: aboutMe,
      setValue: setAboutMe,
      isValid: isAboutMeValid,
      isFilled: isAboutMeFilled,
      setValid: setIsAboutMeValid,
      setFilled: setIsAboutMeFilled,
    },
    {
      id: "technologies",
      field: "Стек технологий",
      value: technologies,
      setValue: setTechnologies,
      isValid: isTechnologiesValid,
      isFilled: isTechnologiesFilled,
      setValid: setIsTechnologiesValid,
      setFilled: setIsTechnologiesFilled,
    },
    {
      id: "lastProject",
      field: "Описание последнего проекта",
      value: lastProject,
      setValue: setLastProject,
      isValid: isLastProjectValid,
      isFilled: isLastProjectFilled,
      setValid: setIsLastProjectValid,
      setFilled: setIsLastProjectFilled,
    },
  ];

  const handleCancel = () => {
    setName("");
    setSurname("");
    setBirthday("");
    setPhone("");
    setWebsite("");
    setAboutMe("");
    setTechnologies("");
    setLastProject("");

    setIsNameValid(false);
    setIsSurnameValid(false);
    setIsBirthdayValid(false);
    setIsPhoneValid(false);
    setIsWebsiteValid(false);
    setIsAboutMeValid(false);
    setIsTechnologiesValid(false);
    setIsLastProjectValid(false);

    setIsNameFilled(false);
    setIsSurnameFilled(false);
    setIsBirthdayFilled(false);
    setIsPhoneFilled(false);
    setIsWebsiteFilled(false);
    setIsAboutMeFilled(false);
    setIsTechnologiesFilled(false);
    setIsLastProjectFilled(false);

    setTextAreaMaxLength(600);

    setIsShowCancelledPopup(true);
    setIsShowSubmittedPopup(false);

    setIsSubmitted(false);
    setIsShowResult(false);
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

    if (isShowCancelledPopup) {
      timerId = setTimeout(() => {
        setIsShowCancelledPopup(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isShowCancelledPopup]);

  useEffect(() => {
    let timerId;

    if (isShowSubmittedPopup) {
      timerId = setTimeout(() => {
        setIsShowSubmittedPopup(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isShowSubmittedPopup]);

  const validate = ({ id, value, setValid, setFilled }) => {
    // remove spaces from the beginning and the end
    const trimmedValue = value.trim();

    // make sure that the value is both filled and valid
    let validAndFilled;

    if (trimmedValue !== "") {
      setFilled(true);
    } else {
      validAndFilled = false;
      setFilled(false);
    }

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
        isValid = validateTextArea(trimmedValue, this.state.textAreaMaxLength);
        break;
    }

    if (validAndFilled !== false) validAndFilled = isValid;
    setValid(isValid);
    return validAndFilled;
  };

  const phoneMask = ({ setValue, value }) => {
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

    setValue(newValue);
  };

  const onChange = ({ e, id, setValue, setValid, setFilled }) => {
    const value = e.target.value;

    if (id === "phone") {
      phoneMask({ setValue, value });
    } else {
      setValue(value);
    }

    // if the info was submitted, it does not mean that all the fields are valid or filled!
    // if the user, after submission changed any values, we need to validate them once again!
    if (isSubmitted) {
      validate({ id, value, setValid, setFilled });
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    setIsSubmitted(true);

    let allValuesValidAndFilled;

    for (let item of [...inputData, ...textAreaData]) {
      const { id, value, setValid, setFilled } = item;

      const isValidFilled = validate({ id, value, setValid, setFilled });

      if (allValuesValidAndFilled !== false) {
        allValuesValidAndFilled = isValidFilled;
      }
    }

    if (allValuesValidAndFilled) {
      setIsShowSubmittedPopup(true);
      setIsShowResult(true);
    }
  };

  return (
    <div className="App">
      <div className={styles.questionnaire}>
        <p className={styles.questionnaire__title}>{isShowResult ? "Результат" : "Создание анкеты"}</p>
        <form
          ref={formRef}
          className={isShowResult ? `${styles.questionnaire__form} ${styles.none}` : styles.questionnaire__form}
          onSubmit={handleSubmit}
        >
          {inputData.map((input) => {
            return <Input key={input.id} {...input} onChange={onChange} isSubmitted={isSubmitted} />;
          })}
          {textAreaData.map((textArea) => {
            return <TextArea key={textArea.id} {...textArea} onChange={onChange} isSubmitted={isSubmitted} maxLength={textAreaMaxLength} />;
          })}
          <div className={styles.questionnaire__buttons}>
            <Button text="Отменить" type="button" handleCancel={handleCancel} />
            <Button text="Отправить" type="submit" />
          </div>
        </form>
        <div ref={resultRef} className={isShowResult ? styles.questionnaire__results : `${styles.questionnaire__results} ${styles.none}`}>
          {inputData.map(({ id, field, value }) => {
            return (
              <div className={styles.questionnaire__result} key={id}>
                {field}: {value}
              </div>
            );
          })}
          {textAreaData.map(({ id, field, value }) => {
            return (
              <div className={styles.questionnaire__result} key={id}>
                {field}: {value}
              </div>
            );
          })}
          <Button text="Отменить" type="button" handleCancel={handleCancel} />
        </div>
        <span ref={svgContainer} className={styles.questionnaire__svg}>
          <img src={msgSvg} alt="Your SVG" />
        </span>
        <PopupMessages isShowSubmittedPopup={isShowSubmittedPopup} isShowCancelledPopup={isShowCancelledPopup} />
      </div>
    </div>
  );
};

export default Form;
