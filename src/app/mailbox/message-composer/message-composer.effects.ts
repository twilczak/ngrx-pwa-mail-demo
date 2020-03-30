import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { MailService } from '../mail.service';
import {
  MESSAGE_SEND, MESSAGE_SEND_FAILED, MESSAGE_SEND_SUCCESS, MessageSend, MessageSendFailed,
  MessageSendSuccess
} from './message-composer.actions';

@Injectable()
export class MessageComposerEffects {
  constructor(private actions$: Actions, private mailService: MailService, private router: Router, private route: ActivatedRoute) {}

  @Effect()
  sendMessage$ = this.actions$.pipe(
    ofType(MESSAGE_SEND),
    switchMap(({payload}: MessageSend) => {
      return this.mailService
        .sendMessage(payload.message)
        .pipe(
          map(response => new MessageSendSuccess({message: response, mailbox: payload.mailbox})),
          catchError(error => of(new MessageSendFailed({message: payload.message, error})))
        );
    })
  );

  @Effect({dispatch: false})
  sendMessageSuccess$ = this.actions$.pipe(
    ofType(MESSAGE_SEND_SUCCESS),
    tap(({payload}: MessageSendSuccess) => {
      const mailbox = payload.mailbox;
      const messageId = payload.message.id;
      const url = mailbox === 'outbox' ? `/outbox/view/${messageId}` : '/inbox';

      this.router.navigateByUrl(url);
    })
  );

  @Effect({dispatch: false})
  sendMessageFailed$ = this.actions$.pipe(
    ofType(MESSAGE_SEND_FAILED),
    tap(({payload}: MessageSendFailed) => {
      const message = payload.message;
      const error = payload.error;

      console.error('Unable to send message', message, error);
    })
  );
}
