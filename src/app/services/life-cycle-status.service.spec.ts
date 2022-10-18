import { TestBed } from '@angular/core/testing';

import { LifeCycleStatusService } from './life-cycle-status.service';

describe('LifeCycleStatusService', () => {
  let service: LifeCycleStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LifeCycleStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
