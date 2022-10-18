import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeProductViewComponent } from './upgrade-product-view.component';

describe('UpgradeProductViewComponent', () => {
  let component: UpgradeProductViewComponent;
  let fixture: ComponentFixture<UpgradeProductViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgradeProductViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
