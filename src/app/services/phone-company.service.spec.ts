import { TestBed } from '@angular/core/testing';

import { PhoneCompanyService } from './phone-company.service';

describe('PhoneCompanyService', () => {
  let service: PhoneCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
