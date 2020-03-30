import { MailMessage } from '../mail-message';
import { MESSAGE_SEND, MESSAGE_SEND_FAILED, MESSAGE_SEND_SUCCESS, MessageComposerActions } from './message-composer.actions';

export interface MessageComposerState {
  loading: boolean;
  message: MailMessage;
}

const initialState: MessageComposerState = {
  loading: false,
  message: null
};

export function messageComposerReducer(state = initialState, action: MessageComposerActions): MessageComposerState {

  switch (action.type) {

    case MESSAGE_SEND: {
      return {
        ...state,
        loading: true,
        message: null
      };
    }

    case MESSAGE_SEND_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: null
      };
    }

    case MESSAGE_SEND_FAILED: {
      return {
        ...state,
        loading: false,
        message: action.payload.message
      };
    }

    default: {
      return state;
    }
  }
}
