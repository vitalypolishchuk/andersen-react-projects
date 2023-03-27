export const initialState = {
  fields: {
    name: "",
    surname: "",
    birthday: "",
    phone: "",
    website: "",
    aboutMe: "",
    technologies: "",
    lastProject: "",
  },

  formErrors: {
    name: "",
    surname: "",
    birthday: "",
    phone: "",
    website: "",
    aboutMe: "",
    technologies: "",
    lastProject: "",
  },

  textAreaMaxLength: 600,

  isShowCancelledPopup: false,
  isShowSubmittedPopup: false,
  isSubmitted: false,
  isShowResult: false,
};
