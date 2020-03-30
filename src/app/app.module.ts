import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer, RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule, CustomRouterStateSerializer } from './routing';
import { MailboxComponent, MailboxEffects, mailboxReducer, MailService } from './mailbox';
import { MailboxControlsComponent } from './mailbox/mailbox-controls';
import { MessageComposerComponent, MessageComposerEffects, messageComposerReducer } from './mailbox/message-composer';
import { MessageReaderComponent, MessageReaderContainerComponent, messageReaderReducer,
  MessageReaderEffects } from './mailbox/message-reader';

const reducers = {
  router: routerReducer,
  mailbox: mailboxReducer,
  messageReader: messageReaderReducer,
  messageComposer: messageComposerReducer
};

const effects = [
  MailboxEffects,
  MessageReaderEffects,
  MessageComposerEffects
];

@NgModule({
  declarations: [
    AppComponent,
    MailboxComponent,
    MailboxControlsComponent,
    MessageComposerComponent,
    MessageReaderComponent,
    MessageReaderContainerComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    MailService,
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
