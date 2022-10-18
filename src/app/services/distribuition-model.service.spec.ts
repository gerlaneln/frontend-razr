import { TestBed } from '@angular/core/testing';

import { DistribuitionModelService } from './distribuition-model.service';

describe('DistribuitionModelService', () => {
  let service: DistribuitionModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistribuitionModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
