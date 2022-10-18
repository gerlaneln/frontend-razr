import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneFamilyViewComponent } from './phone-family-view.component';

describe('PhoneFamilyViewComponent', () => {
  let component: PhoneFamilyViewComponent;
  let fixture: ComponentFixture<PhoneFamilyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneFamilyViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneFamilyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
