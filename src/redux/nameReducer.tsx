import { EDIT_NAME } from "./types";

const initialState = "";

type ActionType = {
  type: string;
  payload: string;
};

export const nameReducer = (state: string = initialState, action: ActionType) => {
  switch (action.type) {
    case EDIT_NAME:
      return action.payload;
    default:
      return state;
  }
};
