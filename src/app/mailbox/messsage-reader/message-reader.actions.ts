import { Action } from '@ngrx/store';
import { MailMessage } from '../mail-message';

export const MESSAGE_LOADING = 'Loading Message (MessageReader)';
export const MESSAGE_LOADED = 'Message Loaded (MessageReader)';
export const MESSAGE_DELETING = 'Deleting Message (MessageReader)';
export const MESSAGE_DELETED = 'Message Deleted (MessageReader)';
export const MESSAGE_DELETE_FAILED = 'Delete Message Failure (MessageReader)';
export const MESSAGE_LOAD_FAILED = 'Load Message Failure (MessageReader)';

export class MessageDeleting implements Action {
  readonly type = MESSAGE_DELETING;

  constructor(public payload: {message: MailMessage, mailbox: string}) {}
}

export class MessageDeleted implements Action {
  readonly type = MESSAGE_DELETED;

  constructor(public payload: {mailbox: string}) {}
}

export class MessageDeleteFailed implements Action {
  readonly type = MESSAGE_DELETE_FAILED;

  constructor(public payload: {message: MailMessage, mailbox: string}) {}
}

export class MessageLoading implements Action {
  readonly type = MESSAGE_LOADING;

  constructor(public payload: {mailbox: string, messageId: string}) {}
}

export class MessageLoaded implements Action {
  readonly type = MESSAGE_LOADED;

  constructor(public payload: MailMessage) {}
}

export class MessageLoadFailed implements Action {
  readonly type = MESSAGE_LOAD_FAILED;

  constructor(public payload: {messageId: string, error: any}) {}
}

export type Actions = MessageLoading | MessageLoaded | MessageDeleting | MessageDeleted | MessageDeleteFailed | MessageLoadFailed;
