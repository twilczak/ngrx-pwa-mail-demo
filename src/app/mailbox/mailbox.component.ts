import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs/';
import { Store } from '@ngrx/store';

import { MailMessage } from './mail-message';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MailboxComponent implements OnInit {

  mailbox: string;
  messages$: Observable<MailMessage[]>;

  constructor( private route: ActivatedRoute, private store: Store<any> ) { }

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.mailbox = url[0].path;
    });

    this.messages$ = this.store.select(s => {
      return this.inboxActive() ?
        s.mailbox.inbox.messages :
        s.mailbox.outbox.messages;
    });
  }

  inboxActive(): boolean {
    return this.mailbox === 'inbox';
  }

  outboxActive(): boolean {
    return this.mailbox === 'outbox';
  }
}
