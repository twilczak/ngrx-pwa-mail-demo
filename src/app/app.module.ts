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
import { MailboxComponent, MailboxControlsComponent, MailboxEffects, mailboxReducer, MailService } from './mailbox';

const reducers = {
  router: routerReducer,
  mailbox: mailboxReducer,
  // messageReader: messageReaderReducer,
  // messageComposer: messageComposerReducer
};

const effects = [
  MailboxEffects,
  // MessageReaderEffects,
  // MessageComposerEffects
];

@NgModule({
  declarations: [
    AppComponent,
    MailboxComponent,
    MailboxControlsComponent,
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
