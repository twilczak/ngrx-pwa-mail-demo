import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MessageComposerComponent } from './message-composer.component';
import { Store, StoreModule } from '@ngrx/store';
import { messageComposerReducer } from './message-composer.reducer';
import { DebugElement } from '@angular/core';
import { MailMessage } from '../mail-message';
import { MESSAGE_SEND, MessageSendFailed } from './message-composer.actions';
import { ActivatedRoute } from '@angular/router';


describe('MessageComposerComponent', () => {
  let component: MessageComposerComponent;
  let fixture: ComponentFixture<MessageComposerComponent>;
  let debugElement: DebugElement;
  let store: Store<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule, RouterTestingModule, StoreModule.forRoot({messageComposer: messageComposerReducer}) ],
      declarations: [ MessageComposerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComposerComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(getForm()).toBeTruthy();
    expect(getControls()).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should create the messageForm', () => {
      expect(component.messageForm).toBeTruthy();
      expect(component.messageForm.controls.recipient).toBeTruthy();
      expect(component.messageForm.controls.subject).toBeTruthy();
      expect(component.messageForm.controls.body).toBeTruthy();
    });

    it('should update the form fields with a message if available', () => {
      const message = {recipient: 'testUser', subject: 'test', body: 'test'} as MailMessage;
      store.dispatch(new MessageSendFailed({message, error: ''}));

      const form = component.messageForm.getRawValue();
      expect(form.recipient).toEqual(message.recipient);
      expect(form.subject).toEqual(message.subject);
      expect(form.body).toEqual(message.body);
    });
  });

  describe('form validation', () => {
    it('disables the send button when inputs are empty', () => {
      expect(getSendButton().disabled).toBeTruthy();
    });

    it('enables the send button when inputs are not empty', () => {
      component.messageForm.patchValue({recipient: 'testUser', body: 'test', subject: 'test'});
      fixture.detectChanges();

      expect(getSendButton().disabled).toBeFalsy();
    });
  });

  describe('send()', () => {
    it('Dispatches a MessageSend action', () => {
      TestBed.get(ActivatedRoute).snapshot = {parent: {url: [{path: 'outbox'}]}};
      const message = {sender: 'Me', recipient: 'testUser', subject: 'test', body: 'test'};
      spyOn(store, 'dispatch');

      component.messageForm.patchValue(message);
      component.send();

      expect(store.dispatch).toHaveBeenCalled();
      const dispatchedAction = (store.dispatch as jasmine.Spy).calls.mostRecent().args[0];

      expect(dispatchedAction.type).toEqual(MESSAGE_SEND);
      expect(dispatchedAction.payload.mailbox).toEqual('outbox');

      const sentMessage = dispatchedAction.payload.message;
      expect(sentMessage.sender).toEqual('Me');
      expect(sentMessage.recipient).toEqual('testUser');
      expect(sentMessage.subject).toEqual('test');
      expect(sentMessage.body).toEqual('test');
    });
  });

  function getControls() {
    return debugElement.nativeElement.querySelector('.message-controls');
  }

  function getForm() {
    return debugElement.nativeElement.querySelector('.message-composer');
  }

  function getCancelButton() {
    return getControls().querySelector('button#cancel');
  }

  function getSendButton() {
    return getControls().querySelector('button#send');
  }

  function getRecipientInput() {
    return getForm().querySelector('.composer-input[formControlName="recipient"]');
  }

  function getSubjectInput() {
    return getForm().querySelector('.composer-input[formControlName="subject"]');
  }

  function getBodyInput() {
    return getForm().querySelector('.composer-input[formControlName="body"]');
  }
});
