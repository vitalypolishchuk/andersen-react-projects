export const INPUTS = [
  {
    field: "Имя",
    inputType: "text",
    id: "name",
    placeholder: "Иван",
    validationName: "isNameValid",
    fillingName: "isNameFilled",
  },
  {
    field: "Фамилия",
    inputType: "text",
    id: "surname",
    placeholder: "Иваненко",
    validationName: "isSurnameValid",
    fillingName: "isSurnameFilled",
  },
  {
    field: "Дата Рождения",
    inputType: "date",
    id: "birthday",
    placeholder: "",
    validationName: "isBirthdayValid",
    fillingName: "isBirthdayFilled",
  },
  {
    field: "Телефон",
    inputType: "text",
    id: "phone",
    placeholder: "+123456789",
    validationName: "isPhoneValid",
    fillingName: "isPhoneFilled",
  },
  {
    field: "Сайт",
    inputType: "text",
    id: "website",
    placeholder: "https://localhost:3000",
    validationName: "isWebsiteValid",
    fillingName: "isWebsiteFilled",
  },
];

export const TEXTAREAS = [
  {
    field: "О себе",
    id: "aboutMe",
    validationName: "isAboutMeValid",
    fillingName: "isAboutMeFilled",
  },
  {
    field: "Стек технологий",
    id: "technologies",
    validationName: "isTechnologiesValid",
    fillingName: "isTechnologiesFilled",
  },

  {
    field: "Описание последнего проекта",
    id: "lastProject",
    validationName: "isLastProjectValid",
    fillingName: "isLastProjectFilled",
  },
];
