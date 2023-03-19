import "./Form.css";
import { useState, useEffect, useRef } from "react";
import msgSvg from "../../images/msg.svg";
import { INPUTS, TEXTAREAS } from "../Data/Data";
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

  const handleSvgScroll = (e) => {
    formRef.current.scrollBy(e.deltaX, e.deltaY);
    resultRef.current.scrollBy(e.deltaX, e.deltaY);
  };

  useEffect(() => {
    // user should be able to scroll the form, even when scrolling on SVG
    svgContainer.current.addEventListener("wheel", handleSvgScroll);

    return () => {
      svgContainer.current.removeEventListener("wheel", handleSvgScroll);
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

  const getStateData = (id) => {
    if (id === "name")
      return {
        value: name,
        setValue: setName,
        isValid: isNameValid,
        isFilled: isNameFilled,
        setValid: setIsNameValid,
        setFilled: setIsNameFilled,
      };
    if (id === "surname")
      return {
        value: surname,
        setValue: setSurname,
        isValid: isSurnameValid,
        isFilled: isSurnameFilled,
        setValid: setIsSurnameValid,
        setFilled: setIsSurnameFilled,
      };
    if (id === "birthday")
      return {
        value: birthday,
        setValue: setBirthday,
        isValid: isBirthdayValid,
        isFilled: isBirthdayFilled,
        setValid: setIsBirthdayValid,
        setFilled: setIsBirthdayFilled,
      };
    if (id === "phone")
      return {
        value: phone,
        setValue: setPhone,
        isValid: isPhoneValid,
        isFilled: isPhoneFilled,
        setValid: setIsPhoneValid,
        setFilled: setIsPhoneFilled,
      };
    if (id === "website")
      return {
        value: website,
        setValue: setWebsite,
        isValid: isWebsiteValid,
        isFilled: isWebsiteFilled,
        setValid: setIsWebsiteValid,
        setFilled: setIsWebsiteFilled,
      };
    if (id === "aboutMe")
      return {
        value: aboutMe,
        setValue: setAboutMe,
        isValid: isAboutMeValid,
        isFilled: isAboutMeFilled,
        setValid: setIsAboutMeValid,
        setFilled: setIsAboutMeFilled,
      };
    if (id === "technologies")
      return {
        value: technologies,
        setValue: setTechnologies,
        isValid: isTechnologiesValid,
        isFilled: isTechnologiesFilled,
        setValid: setIsTechnologiesValid,
        setFilled: setIsTechnologiesFilled,
      };
    if (id === "lastProject")
      return {
        value: lastProject,
        setValue: setLastProject,
        isValid: isLastProjectValid,
        isFilled: isLastProjectFilled,
        setValid: setIsLastProjectValid,
        setFilled: setIsLastProjectFilled,
      };
  };

  const validate = ({ value, id, setValid, setFilled }) => {
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

    if (id === "name" || id === "surname") {
      isValid = validateUpperCase(trimmedValue);
    } else if (id === "birthday") {
      isValid = validateDate(trimmedValue);
    } else if (id === "phone") {
      isValid = validatePhone(trimmedValue);
    } else if (id === "website") {
      isValid = validateWebsite(trimmedValue);
    } else if (id === "aboutMe" || id === "technologies" || id === "lastProject") {
      isValid = validateTextArea(trimmedValue, textAreaMaxLength);
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
      validate({ value, id, setValid, setFilled });
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    setIsSubmitted(true);

    let allValuesValidAndFilled;

    for (let input of [...INPUTS, ...TEXTAREAS]) {
      const { id } = input;
      const { value, setValid, setFilled } = getStateData(id);

      const isValidFilled = validate({ value, id, setValid, setFilled });

      if (allValuesValidAndFilled !== false) {
        allValuesValidAndFilled = isValidFilled;
      }
    }

    if (allValuesValidAndFilled) {
      setIsShowSubmittedPopup(true);
      setIsShowResult(true);
    }
  };

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

  return (
    <div className="App">
      <div className="questionnaire">
        <p className="questionnaire__title">{isShowResult ? "Результат" : "Создание анкеты"}</p>
        <form ref={formRef} className={isShowResult ? "questionnaire__form none" : "questionnaire__form"} onSubmit={handleSubmit}>
          {INPUTS.map((input) => {
            return (
              <Input
                key={input.id}
                {...input}
                onChange={onChange}
                stateData={getStateData(input.id)}
                isSubmitted={isSubmitted}
                phoneMask={input.id === "phone" ? phoneMask : null}
              />
            );
          })}
          {TEXTAREAS.map((textArea) => {
            return (
              <TextArea
                key={textArea.id}
                {...textArea}
                onChange={onChange}
                stateData={getStateData(textArea.id)}
                isSubmitted={isSubmitted}
                maxLength={textAreaMaxLength}
              />
            );
          })}
          <div className="questionnaire__buttons">
            <Button text="Отменить" type="button" handleCancel={handleCancel} />
            <Button text="Отправить" type="submit" />
          </div>
        </form>
        <div ref={resultRef} className={isShowResult ? "questionnaire__result" : "questionnaire__result none"}>
          {INPUTS.map(({ id, field }) => {
            return (
              <div className="questionnaire__result-item" key={id}>
                {field}: {getStateData(id).value}
              </div>
            );
          })}
          {TEXTAREAS.map(({ id, field }) => {
            return (
              <div className="questionnaire__result-item" key={id}>
                {field}: {getStateData(id).value}
              </div>
            );
          })}
          <Button text="Отменить" type="button" handleCancel={handleCancel} />
        </div>
        <span ref={svgContainer} className="questionnaire__svg-container">
          <img src={msgSvg} alt="Your SVG" />
        </span>
        <PopupMessages isShowSubmittedPopup={isShowSubmittedPopup} isShowCancelledPopup={isShowCancelledPopup} />
      </div>
    </div>
  );
};

export default Form;
