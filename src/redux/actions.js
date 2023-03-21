import { EDIT_NAME } from "./types";

export const editName = (name) => {
  return { type: EDIT_NAME, payload: name };
};
