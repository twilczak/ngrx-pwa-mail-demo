import { Action } from '@ngrx/store';
import { MailMessage } from '../mail-message';

export const MESSAGE_SEND = 'Message Send (MessageComposer)';
export const MESSAGE_SEND_SUCCESS = 'Message Send Success (MessageComposer)';
export const MESSAGE_SEND_FAILED = 'Message Send Failed (MessageComposer)';

export class MessageSend implements Action {
  readonly type = MESSAGE_SEND;

  constructor(public payload: {message: MailMessage, mailbox: string}) {}
}

export class MessageSendSuccess implements Action {
  readonly type = MESSAGE_SEND_SUCCESS;

  constructor(public payload: {message: MailMessage, mailbox: string}) {}
}

export class MessageSendFailed implements Action {
  readonly type = MESSAGE_SEND_FAILED;

  constructor(public payload: {message: MailMessage, error: any}) {}
}

export type Actions = MessageSend | MessageSendSuccess | MessageSendFailed;
