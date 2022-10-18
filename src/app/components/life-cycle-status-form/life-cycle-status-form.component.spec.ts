import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeCycleStatusFormComponent } from './life-cycle-status-form.component';

describe('LifeCycleStatusFormComponent', () => {
  let component: LifeCycleStatusFormComponent;
  let fixture: ComponentFixture<LifeCycleStatusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeCycleStatusFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeCycleStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
