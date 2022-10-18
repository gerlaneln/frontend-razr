import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductScopeFormComponent } from './product-scope-form.component';

describe('ProductScopeFormComponent', () => {
  let component: ProductScopeFormComponent;
  let fixture: ComponentFixture<ProductScopeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductScopeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductScopeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
