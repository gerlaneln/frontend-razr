import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeFormComponent } from './upgrade-form.component';

describe('UpgradeFormComponent', () => {
  let component: UpgradeFormComponent;
  let fixture: ComponentFixture<UpgradeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgradeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
