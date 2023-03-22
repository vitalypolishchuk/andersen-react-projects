import { EDIT_NAME } from "./types";

const initialState = "";

export const nameReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_NAME:
      return action.payload;
    default:
      return state;
  }
};
