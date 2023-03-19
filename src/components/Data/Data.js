export const INPUTS = [
  {
    field: "Имя",
    inputType: "text",
    id: "name",
    placeholder: "Иван",
  },
  {
    field: "Фамилия",
    inputType: "text",
    id: "surname",
    placeholder: "Иваненко",
  },
  {
    field: "Дата Рождения",
    inputType: "date",
    id: "birthday",
    placeholder: "",
  },
  {
    field: "Телефон",
    inputType: "text",
    id: "phone",
    placeholder: "+123456789",
  },
  {
    field: "Сайт",
    inputType: "text",
    id: "website",
    placeholder: "https://localhost:3000",
  },
];

export const TEXTAREAS = [
  {
    field: "О себе",
    id: "aboutMe",
  },
  {
    field: "Стек технологий",
    id: "technologies",
  },

  {
    field: "Описание последнего проекта",
    id: "lastProject",
    validationName: "isLastProjectValid",
    fillingName: "isLastProjectFilled",
  },
];
