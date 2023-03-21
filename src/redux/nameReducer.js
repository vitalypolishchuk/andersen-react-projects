import { EDIT_NAME } from "./types";

const initialState = {
  name: "",
};

export const nameReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_NAME:
      return { ...state, name: action.payload };
    default:
      return state;
  }
};
