import "./App.css";
import React from "react";
import msgSvg from "../../images/msg.svg";
import { INPUTS, TEXTAREAS } from "../Data/Data";
import { validateUpperCase, validateDate, validatePhone, validateWebsite, validateTextArea } from "../Validation/Validation";
import Input from "../Input/Input";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import PopupMessages from "../PopupMessages/PopupMessages";

const initialState = {
  name: "",
  surname: "",
  birthday: "",
  phone: "",
  website: "",
  aboutMe: "",
  technologies: "",
  lastProject: "",

  // if Valid is TRUE it means that the value is VALID
  isNameValid: false,
  isSurnameValid: false,
  isBirthdayValid: false,
  isPhoneValid: false,
  isWebsiteValid: false,
  isAboutMeValid: false,
  isTechnologiesValid: false,
  isLastProjectValid: false,

  // If Filled is TRUE it means that the value is NOT empty
  isNameFilled: false,
  isSurnameFilled: false,
  isBirthdayFilled: false,
  isPhoneFilled: false,
  isWebsiteFilled: false,
  isAboutMeFilled: false,
  isTechnologiesFilled: false,
  isLastProjectFilled: false,

  textAreaMaxLength: 600,

  // isSubmitted is TRUE once the user clicks on "SUBMIT" button, but it does not mean that the fields are valid or filled
  isSubmitted: false,

  // if the form is cancelled, show popup
  isShowCancelledPopup: false,
  // if the form is submitted, show popup
  isShowSubmittedPopup: false,

  // show result of the submit
  isShowResult: false,
};

class App extends React.Component {
  constructor() {
    super();
    this.timerId = null;
    this.svgContainer = React.createRef();
    this.formRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSvgScroll = this.handleSvgScroll.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = { ...initialState };
  }

  componentDidMount() {
    // user should be able to scroll the form, even when scrolling on SVG
    this.svgContainer.current.addEventListener("wheel", this.handleSvgScroll);
  }

  handleSvgScroll(e) {
    this.formRef.current.scrollBy(e.deltaX, e.deltaY);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isShowCancelledPopup) {
      this.timerId = setTimeout(() => {
        this.setState({ isShowCancelledPopup: false });
      }, 5000);
    }

    if (this.state.isShowSubmittedPopup) {
      this.timerId = setTimeout(() => {
        this.setState({ isShowSubmittedPopup: false });
      }, 5000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerId);
    this.svgContainer.current.removeEventListener("wheel", this.handleSvgScroll);
  }

  validate({ value, id, fillingName, validationName }) {
    // remove spaces from the beginning and the end
    const trimmedValue = value.trim();

    // make sure that the value is both filled and valid
    let validAndFilled;

    if (trimmedValue !== "") {
      this.setState({ [fillingName]: true });
    } else {
      validAndFilled = false;
      this.setState({ [fillingName]: false });
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
      isValid = validateTextArea(trimmedValue, this.state.textAreaMaxLength);
    }

    if (validAndFilled !== false) validAndFilled = isValid;
    this.setState({ [validationName]: isValid });
    return validAndFilled;
  }

  onChange({ e, id, fillingName, validationName }) {
    const value = e.target.value;

    if (id === "phone") {
      this.phoneMask(value);
    } else {
      this.setState({ [id]: value });
    }

    // if the info was submitted, it does not mean that all the fields are valid or filled!
    // if the user, after submission changed any values, we need to validate them once again!
    if (this.state.isSubmitted) {
      this.validate({ value, id, fillingName, validationName });
    }
  }

  handleSubmit(e) {
    if (e) e.preventDefault();

    this.setState({ isSubmitted: true });

    let allValuesValidAndFilled;
    let findItem;

    for (let [id, value] of Object.entries(this.state)) {
      if (id === "name" || id === "surname" || id === "birthday" || id === "phone" || id === "website") {
        findItem = INPUTS.find((input) => input.id === id);
      } else if (id === "aboutMe" || id === "technologies" || id === "lastProject") {
        findItem = TEXTAREAS.find((input) => input.id === id);
      }

      if (
        id === "name" ||
        id === "surname" ||
        id === "birthday" ||
        id === "phone" ||
        id === "website" ||
        id === "aboutMe" ||
        id === "technologies" ||
        id === "lastProject"
      ) {
        const validationName = findItem.validationName;
        const fillingName = findItem.fillingName;

        const isValidFilled = this.validate({ value, id, validationName, fillingName });

        if (allValuesValidAndFilled !== false) {
          allValuesValidAndFilled = isValidFilled;
        }
      }
    }

    if (allValuesValidAndFilled) this.setState({ isShowSubmittedPopup: true, isShowResult: true });
  }

  handleCancel() {
    this.setState({ ...initialState, isShowCancelledPopup: true });
  }

  phoneMask = (value) => {
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

    this.setState({ phone: newValue });
  };

  render() {
    return (
      <div className="App">
        <div className="questionnaire">
          <p className="questionnaire__title">{this.state.isShowResult ? "Результат" : "Создание анкеты"}</p>
          <form
            ref={this.formRef}
            className={this.state.isShowResult ? "questionnaire__form none" : "questionnaire__form"}
            onSubmit={this.handleSubmit}
          >
            {INPUTS.map((input) => {
              return (
                <Input
                  key={input.id}
                  {...input}
                  onChange={this.onChange}
                  value={this.state[input.id]}
                  isValid={this.state[input.validationName]}
                  isFilled={this.state[input.fillingName]}
                  isSubmitted={this.state.isSubmitted}
                  valid={false}
                  phoneMask={input.id === "phone" ? this.phoneMask : null}
                />
              );
            })}
            {TEXTAREAS.map((textArea) => {
              return (
                <TextArea
                  key={textArea.id}
                  {...textArea}
                  onChange={this.onChange}
                  value={this.state[textArea.id]}
                  isValid={this.state[textArea.validationName]}
                  isFilled={this.state[textArea.fillingName]}
                  isSubmitted={this.state.isSubmitted}
                  maxLength={this.state.textAreaMaxLength}
                />
              );
            })}
            <div className="questionnaire__buttons">
              <Button text="Отменить" type="button" handleCancel={this.handleCancel} />
              <Button text="Отправить" type="submit" />
            </div>
          </form>
          <div className={this.state.isShowResult ? "questionnaire__result" : "questionnaire__result none"}>
            {INPUTS.map(({ id, field }) => {
              return (
                <div className="questionnaire__result-item" key={id}>
                  {field}: {this.state[id]}
                </div>
              );
            })}
            {TEXTAREAS.map(({ id, field }) => {
              return (
                <div className="questionnaire__result-item" key={id}>
                  {field}: {this.state[id]}
                </div>
              );
            })}
            <Button text="Отменить" type="button" handleCancel={this.handleCancel} />
          </div>
          <span ref={this.svgContainer} className="questionnaire__svg-container">
            <img src={msgSvg} alt="Your SVG" />
          </span>
          <PopupMessages isShowSubmittedPopup={this.state.isShowSubmittedPopup} isShowCancelledPopup={this.state.isShowCancelledPopup} />
        </div>
      </div>
    );
  }
}

export default App;
