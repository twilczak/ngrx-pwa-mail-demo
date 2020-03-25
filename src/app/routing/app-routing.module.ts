import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';

import { MailboxComponent } from '../mailbox/mailbox.component';
// import { MessageReaderContainerComponent } from './mailbox/message-reader/message-reader-container.component';
// import { MessageComposerComponent } from './mailbox/message-composer/message-composer.component';

const routes = [
  { path: '', redirectTo: '/inbox', pathMatch: 'full'},
  { path: 'inbox', component: MailboxComponent,
    children: [
  //     { path: 'view', redirectTo: '/inbox', pathMatch: 'full' },
  //     { path: 'view/:messageId', component: MessageReaderContainerComponent },
  //     { path: 'compose', component: MessageComposerComponent }
    ]
  },
  { path: 'outbox', component: MailboxComponent,
    children: [
  //     { path: 'view', redirectTo: '/outbox', pathMatch: 'full' },
  //     { path: 'view/:messageId', component: MessageReaderContainerComponent },
  //     { path: 'compose', component: MessageComposerComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
