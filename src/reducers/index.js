import { ADD_USER_MESSAGE, ADD_BOT_MESSAGE, ADD_FILE_UPLOAD } from "../constants/action-types";

const initialState = {
  messages: [
    {
      id: '0',
      text: 'How may I help you?',
      type: 'bot'
    },
  ],
}


function rootReducer(state = initialState, action) {
  if (action.type === ADD_USER_MESSAGE) {
    const message = {
      id: state.messages.length.toString(),
      text: action.message,
      type: 'user',
      metadata: null,
    }

    state = Object.assign({}, state, {
      messages: state.messages.concat(message)
    });
  }
  else if (action.type === ADD_BOT_MESSAGE) {
    const message = {
      id: state.messages.length.toString(),
      text: action.message,
      type: 'bot',
      metadata: {full_response: action.full_response},
    }

    state = Object.assign({}, state, {
      messages: state.messages.concat(message)
    });
  }
  else if (action.type === ADD_FILE_UPLOAD) {
    const message = {
      id: state.messages.length.toString(),
      text: "Uploading file " + action.file.name,
      type: 'upload',
      metadata: {local_url: URL.createObjectURL(action.file)},
    }

    state = Object.assign({}, state, {
      messages: state.messages.concat(message)
    });
  }

  return state;
};

export default rootReducer;