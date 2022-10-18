import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneFamilyFormComponent } from './phone-family-form.component';

describe('PhoneFamilyFormComponent', () => {
  let component: PhoneFamilyFormComponent;
  let fixture: ComponentFixture<PhoneFamilyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneFamilyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneFamilyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
