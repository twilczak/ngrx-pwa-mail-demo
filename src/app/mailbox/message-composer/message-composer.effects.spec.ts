import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';

import { MessageComposerEffects } from './message-composer.effects';
import { MailService } from '../mail.service';
import {MessageSend, MessageSendFailed, MessageSendSuccess} from './message-composer.actions';
import {MailMessage} from '../mail-message';
import {Router} from '@angular/router';

// see: https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md
describe('MessageComposerEffects', () => {
  let effects: MessageComposerEffects;
  let actions: Observable<any>;
  const mailService = jasmine.createSpyObj('mailService', ['sendMessage']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MessageComposerEffects,
        provideMockActions(() => actions ),
        { provide: MailService, useValue: mailService }
      ],
      imports: [
        RouterTestingModule
      ]
    });

    effects = TestBed.get(MessageComposerEffects);
  });

  describe('sendMessage$', () => {
    it('calls MailService.sendMessage, and returns MessageSendSuccess on response', () => {
      const action = new MessageSend({message: {id: ''} as MailMessage, mailbox: 'inbox'});
      const responseMessage = {id: 'fakeId'} as MailMessage;
      const completion = new MessageSendSuccess({message: {id: 'fakeId'} as MailMessage, mailbox: 'inbox'});

      // tslint:disable-next-line:align */
            actions  =  hot('-a--', {a: action});
      const response = cold('--b|', {b: responseMessage});
      const expected = cold('---c', {c: completion});

      mailService.sendMessage.and.returnValue(response);

      expect(effects.sendMessage$).toBeObservable(expected);
    });

    it('calls MailService.sendMessage and returns MessageSendFailed on error', () => {
      const action = new MessageSend({message: {id: ''} as MailMessage, mailbox: 'inbox'});
      const error = '404 Not Found';
      const completion = new MessageSendFailed({message: {id: ''} as MailMessage, error});

      // tslint:disable-next-line:align */
            actions  =  hot('-a--', {a: action});
      const response = cold('--#|', {}, error);
      const expected = cold('---c', {c: completion});

      mailService.sendMessage.and.returnValue(response);

      expect(effects.sendMessage$).toBeObservable(expected);
    });
  });

  describe('sendMessageSuccess$', () => {
    let router;
    beforeEach(() => {
      router = TestBed.get(Router);
    });

    it('navigates to the new message if the user is viewing the outbox', () => {
      const action = new MessageSendSuccess({message: {id: '123'} as MailMessage, mailbox: 'outbox'});
      spyOn(router, 'navigateByUrl');

      // tslint:disable-next-line:align */
            actions  =  hot('a--', {a: action});
      const expected = cold('a--', {a: action});

      expect(effects.sendMessageSuccess$).toBeObservable(expected);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/outbox/view/123');
    });

    it('navigates to the inbox if user is viewing the inbox', () => {
      const action = new MessageSendSuccess({message: {id: '123'} as MailMessage, mailbox: 'inbox'});
      spyOn(router, 'navigateByUrl');

      // tslint:disable-next-line:align */
            actions  =  hot('a--', {a: action});
      const expected = cold('a--', {a: action});

      expect(effects.sendMessageSuccess$).toBeObservable(expected);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/inbox');
    });
  });

  describe('sendMessageFailed$', () => {
    it('logs an error on failure', () => {
      const action = new MessageSendFailed({message: {id: ''} as MailMessage, error: '400'});
      spyOn(console, 'error');

      // tslint:disable-next-line:align */
            actions   = hot( '-a-', {a: action});
      const expected = cold( '-a-', {a: action});

      expect(effects.sendMessageFailed$).toBeObservable(expected);
      expect(console.error).toHaveBeenCalledWith(jasmine.any(String), {id: ''}, '400');
    });
  });
});
