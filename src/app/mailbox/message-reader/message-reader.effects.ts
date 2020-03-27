import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

import {
  MESSAGE_LOADING, MessageLoading, MessageLoaded, MESSAGE_DELETING, MessageDeleting,
  MessageDeleted, MessageDeleteFailed, MessageLoadFailed, MESSAGE_LOAD_FAILED
} from './message-reader.actions';

import { MailService } from '../mail.service';
import {MailMessage} from '../mail-message';

@Injectable()
export class MessageReaderEffects {
  constructor(private actions$: Actions, private mailService: MailService ) {}

  @Effect()
  navigateToMessage$ = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    filter((action: RouterNavigationAction) => {
      const url = action.payload.routerState.url;
      return url.startsWith('/inbox/view') || url.startsWith('/outbox/view');
    }),
    map((action: RouterNavigationAction) => {
      const url = action.payload.routerState.url.split('/');
      return new MessageLoading({mailbox: url[1], messageId: url[3]});
    })
  );

  @Effect()
  loadMessage$ = this.actions$.pipe(
    ofType(MESSAGE_LOADING),
    switchMap((action: MessageLoading) => {
      const {mailbox, messageId} = action.payload;
      const getMessage = mailbox === 'inbox' ?
        this.mailService.getInboxMessage :
        this.mailService.getOutboxMessage;

      return getMessage.call(this.mailService, messageId)
        .pipe(
          map((message: MailMessage) => new MessageLoaded(message)),
          catchError(error => of(new MessageLoadFailed({messageId, error})))
        );
    })
  );

  @Effect()
  deleteMessage$ = this.actions$.pipe(
    ofType(MESSAGE_DELETING),
    switchMap((action: MessageDeleting) => {
      const {message, mailbox} = action.payload;

      return this.mailService
        .deleteMessage(mailbox, message.id)
        .pipe(
          map(response =>  new MessageDeleted({mailbox})),
          catchError(error => of(new MessageDeleteFailed({mailbox, message})))
        );
    })
  );

  @Effect({dispatch: false})
  loadMessageFailed$ = this.actions$.pipe(
    ofType(MESSAGE_LOAD_FAILED),
    tap((action: MessageLoadFailed) => {
      const {messageId, error} = action.payload;
      console.error('Unable to load message: ' + messageId, error);
    })
  );
}
