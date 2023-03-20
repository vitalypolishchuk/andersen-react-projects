export const validateUpperCase = (value) => {
  if (value.length < 2) return false;
  return value[0].split("")[0].toUpperCase() === value.split("")[0];
};

export const validateDate = (value) => {
  return new Date(value) !== "Invalid Date" && !isNaN(new Date(value));
};

export const validatePhone = (value) => {
  return /^\d{1}-\d{4}-\d{2}-\d{2,5}$/.test(value);
};

export const validateWebsite = (value) => {
  return /^https:\/\/\w+/.test(value);
};

export const validateTextArea = (value, textAreaMaxLength) => {
  return value.length <= textAreaMaxLength;
};
