import { TestBed, inject } from '@angular/core/testing';

import { MailService } from './mail.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MailService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ MailService ]
    });
  });

  it('should be created', inject([MailService], (service: MailService) => {
    expect(service).toBeTruthy();
  }));
});
