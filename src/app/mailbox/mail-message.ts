export class MailMessage {
  id: string = null;
  subject = '';
  sender = '';
  recipient = '';
  dateSent = '';
  body = '';

  constructor() {
    this.setDateSent();
  }

  private static zeroPad(value: number): string {
    return value > 9 ?  '' + value : '0' + value;
  }

  private setDateSent(date: Date = new Date()) {
    const day = MailMessage.zeroPad(date.getDate());
    const month = MailMessage.zeroPad(date.getMonth() + 1);
    const year = date.getFullYear();

    this.dateSent = `${year}.${month}.${day}`;
  }
}
