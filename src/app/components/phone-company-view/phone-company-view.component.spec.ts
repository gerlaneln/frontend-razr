import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneCompanyViewComponent } from './phone-company-view.component';

describe('PhoneCompanyViewComponent', () => {
  let component: PhoneCompanyViewComponent;
  let fixture: ComponentFixture<PhoneCompanyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneCompanyViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneCompanyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
