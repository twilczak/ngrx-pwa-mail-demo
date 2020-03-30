import { messageComposerReducer } from './message-composer.reducer';
import { MessageComposerActions, MESSAGE_SEND, MessageSend, MESSAGE_SEND_SUCCESS, MessageSendSuccess, MESSAGE_SEND_FAILED,
  MessageSendFailed } from './message-composer.actions';
import { MailMessage } from '../mail-message';

describe('MessageComposerReducer', () => {
  const reducer = messageComposerReducer;

  it('returns initial state by default', () => {
    const state = messageComposerReducer(undefined, {} as MessageComposerActions );

    expect(state.loading).toEqual(false);
    expect(state.message).toEqual(null);
  });

  it(`sets loading to true and clears message on  ${MESSAGE_SEND}`, () => {
    const message = {id: 'foo'} as MailMessage;
    const mailbox = 'inbox';

    const action = new MessageSend({message, mailbox});
    const state = messageComposerReducer(undefined, action);

    expect(state.loading).toEqual(true);
    expect(state.message).toEqual(null);
  });

  it(`returns sets loading to false and clears message on ${MESSAGE_SEND_SUCCESS} `, () => {
    const message = {id: 'foo'} as MailMessage;
    const mailbox = 'inbox';

    const action = new MessageSendSuccess({message, mailbox});
    const state = messageComposerReducer(undefined, action);

    expect(state.loading).toEqual(false);
    expect(state.message).toEqual(null);
  });

  it(`returns sets loading to false and retains payload message on ${MESSAGE_SEND_FAILED} `, () => {
    const message = {id: 'foo'} as MailMessage;
    const error = '400';

    const action = new MessageSendFailed({message, error});
    const state = messageComposerReducer(undefined, action);

    expect(state.loading).toEqual(false);
    expect(state.message).toEqual({id: 'foo'} as MailMessage);
  });
});
