import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MailMessage } from '../mail-message';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MessageDeleting } from './message-reader.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message-reader-container',
  template: `<app-message-reader [message]="message$ | async" (deleteMessage)="deleteMessage($event)"></app-message-reader>`,
  styleUrls: ['./message-reader-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageReaderContainerComponent implements OnInit {

  message$: Observable<MailMessage>;
  mailbox: string;

  constructor(private route: ActivatedRoute, private store: Store<any>) {}

  ngOnInit() {
    this.message$ = this.store.select(s => {
      return s.messageReader.currentMessage;
    });

    this.route.parent.url.subscribe(url => {
      this.mailbox = url[0].path;
    });
  }

  deleteMessage(message: MailMessage) {
    this.store.dispatch(new MessageDeleting({message, mailbox: this.mailbox}));
  }
}
