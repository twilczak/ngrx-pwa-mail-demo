import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { MailMessage } from './mail-message';
import { environment } from '../../environments/environment';

@Injectable()
export class MailService {
  constructor(private http: HttpClient) { }

  // TODO: consider removing the first 4 methods here...
  getInboxMessages(): Observable<MailMessage[]> {
    return this.getMessages('inbox');
  }

  getInboxMessage(id: string): Observable<MailMessage> {
    return this.getMessage('inbox', id);
  }

  getOutboxMessages(): Observable<MailMessage[]> {
    return this.getMessages('outbox');
  }

  getOutboxMessage(id: string): Observable<MailMessage> {
    return this.getMessage('outbox', id);
  }

  getMessages(mailbox: string): Observable<MailMessage[]> {
    const url = `${environment.hostUrl}/${mailbox}`;

    return this.http
      .get(url)
      .pipe(
        map(response => response as MailMessage[])
      );
  }

  getMessage(mailbox: string, id: string): Observable<MailMessage> {
    const url = `${environment.hostUrl}/${mailbox}/${id}`;

    return this.http
      .get(url)
      .pipe(
        map(response => response as MailMessage)
      );
  }

  deleteMessage(mailbox: string, id: string): Observable<MailMessage> {
    const url = `${environment.hostUrl}/${mailbox}/${id}`;

    return this.http
      .delete(url)
      .pipe(
        map(res => res as MailMessage)
      );
  }

  sendMessage(message: MailMessage): Observable<MailMessage> {
    const url = `${environment.hostUrl}/outbox`;

    return this.http
      .post(url, message)
      .pipe(
        map(res => res as MailMessage)
      );
  }
}
