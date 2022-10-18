import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeProductViewComponent } from './scope-product-view.component';

describe('ScopeProductViewComponent', () => {
  let component: ScopeProductViewComponent;
  let fixture: ComponentFixture<ScopeProductViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScopeProductViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopeProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
