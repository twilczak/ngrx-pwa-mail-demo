import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { MailboxControlsComponent } from './mailbox-controls.component';

describe('MailboxControlsComponent', () => {
  let component: MailboxControlsComponent;
  let fixture: ComponentFixture<MailboxControlsComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailboxControlsComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailboxControlsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it( 'should contain links for inbox, outbox and compose', () => {
    const links = getLinks();
    confirmLink(links[0], 'Inbox', 'inbox');
    expect(links[0].getAttribute('RouterLinkActive')).toEqual('is-active');

    confirmLink(links[1], 'Outbox', 'outbox');
    expect(links[1].getAttribute('RouterLinkActive')).toEqual('is-active');

    confirmLink(links[2], 'Compose', 'compose');
  });

  function getLinks() {
    return debugElement.nativeElement.querySelectorAll('a');
  }

  function confirmLink(link: HTMLLinkElement, text: string, href: string) {
    expect(link.classList.contains('mailbox-button')).toEqual(true);
    expect(link.textContent).toEqual(text);
    expect(link.href.split('/')[3]).toEqual(href);
  }
});
