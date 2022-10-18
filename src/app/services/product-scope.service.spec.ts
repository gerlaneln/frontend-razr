import { TestBed } from '@angular/core/testing';

import { ProductScopeService } from './product-scope.service';

describe('ProductScopeService', () => {
  let service: ProductScopeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductScopeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
