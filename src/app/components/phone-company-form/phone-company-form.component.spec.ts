import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneCompanyFormComponent } from './phone-company-form.component';

describe('PhoneCompanyFormComponent', () => {
  let component: PhoneCompanyFormComponent;
  let fixture: ComponentFixture<PhoneCompanyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneCompanyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneCompanyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
