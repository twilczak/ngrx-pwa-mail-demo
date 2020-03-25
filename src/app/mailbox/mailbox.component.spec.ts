import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';

import { MailboxComponent } from './mailbox.component';
import { MailboxControlsComponent } from './mailbox-controls/mailbox-controls.component';
import { InboxLoaded } from './mailbox.actions';
import { mailboxReducer } from './mailbox.reducer';

describe('MailboxComponent', () => {
  let component: MailboxComponent;
  let fixture: ComponentFixture<MailboxComponent>;
  let store: Store<any>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ MailboxComponent, MailboxControlsComponent ],
      imports: [ RouterTestingModule, StoreModule.forRoot({mailbox: mailboxReducer})]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailboxComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
