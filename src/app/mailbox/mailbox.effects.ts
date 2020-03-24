import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

import { MailService } from './mail.service';
import { MESSAGE_DELETED, MessageDeleted } from './messsage-reader/message-reader.actions';
import { INBOX_LOADING, InboxLoaded, MAILBOX_LOAD_FAILED, MailboxLoadFailed, OUTBOX_LOADING, OutboxLoaded } from './mailbox.actions';

@Injectable()
export class MailboxEffects {
  constructor(private actions$: Actions, private mailService: MailService, private router: Router) {}

  @Effect()
  // TODO: consider firing this action from component
  navigateToInbox$ = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    filter((action: RouterNavigationAction) => action.payload.routerState.url.startsWith('/inbox')),
    map(action => ({type: INBOX_LOADING}))
  );

  @Effect()
  // TODO: consider firing this action from component
  navigateToOutbox$ = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    filter((action: RouterNavigationAction) => action.payload.routerState.url.startsWith('/outbox')),
    map(action => ({type: OUTBOX_LOADING}))
  );

  @Effect()
  loadInbox$ = this.actions$.pipe(
    ofType(INBOX_LOADING),
    switchMap(action => {
      return this.mailService
        .getInboxMessages()
        .pipe(
          map(messages => new InboxLoaded(messages)),
          catchError(error => of(new MailboxLoadFailed({mailbox: 'inbox', error})))
        );
    })
  );

  @Effect()
  loadOutbox$ = this.actions$.pipe(
    ofType(OUTBOX_LOADING),
    switchMap(action => {
      return this.mailService
        .getOutboxMessages()
        .pipe(
          map(messages => new OutboxLoaded(messages)),
          catchError(error => of(new MailboxLoadFailed({mailbox: 'outbox', error})))
        );
    })
  );

  @Effect({dispatch: false})
  routeToMailboxOnDelete$ = this.actions$.pipe(
    ofType(MESSAGE_DELETED),
    tap((action: MessageDeleted) => {
      const mailbox = action.payload.mailbox;
      this.router.navigate([mailbox], {replaceUrl: true});
    })
  );

  @Effect({dispatch: false})
  mailboxLoadFailed$ = this.actions$.pipe(
    ofType(MAILBOX_LOAD_FAILED),
    tap((action: MailboxLoadFailed) => {
      const mailboxId = action.payload.mailbox;
      const error = action.payload.error;
      console.error('Unable to load mailbox: ' + mailboxId, error);
    })
  );
}
