import { TestBed } from '@angular/core/testing';

import { AboutpageserviceService } from './aboutpageservice.service';

describe('AboutpageserviceService', () => {
  let service: AboutpageserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutpageserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
