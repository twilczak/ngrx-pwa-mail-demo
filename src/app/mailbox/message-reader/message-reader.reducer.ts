import { MailMessage } from '../mail-message';
import {
  MessageReaderActions, MESSAGE_LOADED, MESSAGE_LOADING, MESSAGE_LOAD_FAILED, MESSAGE_DELETE_FAILED, MESSAGE_DELETED, MESSAGE_DELETING
} from './message-reader.actions';
import { MailboxActions, INBOX_LOADING, OUTBOX_LOADING } from '../mailbox.actions';

export interface MessageReaderState {
  loading: boolean;
  currentMessage: MailMessage;
}

const initialState: MessageReaderState = {
  loading: false,
  currentMessage: null
};

export function messageReaderReducer(state = initialState, action: MessageReaderActions | MailboxActions): MessageReaderState {

  switch (action.type) {

    case MESSAGE_LOADING: {
      return {
        ...state,
        loading: true,
        currentMessage: null
      };
    }

    case MESSAGE_LOADED: {
      return {
        ...state,
        loading: false,
        currentMessage: action.payload
      };
    }

    case MESSAGE_LOAD_FAILED: {
      return {
        ...state,
        loading: false
      };
    }

    case MESSAGE_DELETE_FAILED: {
      return {
        ...state,
        loading: false,
        currentMessage: action.payload.message
      };
    }

    case MESSAGE_DELETED: {
      return {
        ...state,
        loading: false,
      };
    }

    case MESSAGE_DELETING: {
      return {
        ...state,
        loading: true,
        currentMessage: null
      };
    }

    case INBOX_LOADING: {
      return {
        ...state,
        currentMessage: null
      };
    }

    case OUTBOX_LOADING: {
      return {
        ...state,
        currentMessage: null
      };
    }

    default: {
      return state;
    }
  }
}
