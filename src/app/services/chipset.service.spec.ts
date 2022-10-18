import { TestBed } from '@angular/core/testing';

import { ChipsetService } from './chipset.service';

describe('ChipsetService', () => {
  let service: ChipsetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChipsetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
