import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistModelFormComponent } from './dist-model-form.component';

describe('DistModelFormComponent', () => {
  let component: DistModelFormComponent;
  let fixture: ComponentFixture<DistModelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistModelFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistModelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
