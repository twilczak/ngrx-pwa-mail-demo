import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { MailMessage } from '../mail-message';

@Component({
  selector: 'app-message-reader',
  templateUrl: './message-reader.component.html',
  styleUrls: ['./message-reader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageReaderComponent {
  @Input() message: MailMessage;
  @Output() deleteMessage = new EventEmitter();
}
