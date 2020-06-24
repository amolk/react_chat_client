import { ADD_USER_MESSAGE, ADD_BOT_MESSAGE, ADD_FILE_UPLOAD } from "../constants/action-types";

export function addUserMessage(text) {
  return { type: ADD_USER_MESSAGE, message: text }
};

export function addBotMessage(text, full_response) {
  return { type: ADD_BOT_MESSAGE, message: text, full_response: full_response }
};

export function addFileUpload(file) {
  return { type: ADD_FILE_UPLOAD, file: file }
};

