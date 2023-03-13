import "./App.css";
import React from "react";
import msgSvg from "../../images/msg.svg";
import { INPUTS, TEXTAREAS } from "../Data/Data";
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
  isShowCancelledPopup: false,
  isShowSubmittedPopup: false,
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

  componentDidUpdate() {
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

  onChange({ e, id }) {
    const value = e.target.value;
    this.setState({ [id]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log(this.state);
    this.setState({ ...initialState });
    this.setState({ isShowSubmittedPopup: true });
  }

  handleCancel() {
    this.setState({ ...initialState });
    this.setState({ isShowCancelledPopup: true });
  }

  render() {
    return (
      <div className="App">
        <div className="questionnaire">
          <p className="questionnaire__title">Создание анкеты</p>
          <form ref={this.formRef} className="questionnaire__form" onSubmit={this.handleSubmit}>
            {INPUTS.map((input) => {
              return <Input key={input.id} {...input} onChange={this.onChange} value={this.state[input.id]} />;
            })}
            {TEXTAREAS.map((textArea) => {
              return <TextArea key={textArea.id} {...textArea} onChange={this.onChange} value={this.state[textArea.id]} />;
            })}
            <div className="questionnaire__buttons">
              <Button text="Отменить" type="button" handleCancel={this.handleCancel} />
              <Button text="Отправить" type="submit" />
            </div>
          </form>
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
