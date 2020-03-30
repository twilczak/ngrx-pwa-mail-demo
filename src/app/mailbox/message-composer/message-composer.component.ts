import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { MailMessage } from '../mail-message';
import { MessageSend } from './message-composer.actions';


@Component({
  selector: 'app-message-composer',
  templateUrl: './message-composer.component.html',
  styleUrls: ['./message-composer.component.scss']
})
export class MessageComposerComponent implements OnInit, OnDestroy {

  message$: Observable<MailMessage>;
  subscription$: Subscription;
  messageForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private store: Store<any>) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      recipient: ['', Validators.required],
      subject: ['', Validators.required],
      body: ['', Validators.required]
    });

    this.message$ =
      this.store.select( s => s.messageComposer.message);

    this.subscription$ =
      this.message$.subscribe(message => {
        if (message) {
          this.messageForm.patchValue(message);
        }
      });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  sendDisabled() {
    return this.messageForm.status !== 'VALID';
  }

  send() {
    const mailbox: string = this.route.snapshot.parent.url[0].path;
    const message = new MailMessage();
    message.sender = 'Me';
    message.recipient = this.messageForm.value.recipient;
    message.subject = this.messageForm.value.subject;
    message.body = this.messageForm.value.body;

    this.store.dispatch(new MessageSend({message, mailbox}));
  }
}
