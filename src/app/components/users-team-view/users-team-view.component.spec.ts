import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTeamViewComponent } from './users-team-view.component';

describe('UsersTeamViewComponent', () => {
  let component: UsersTeamViewComponent;
  let fixture: ComponentFixture<UsersTeamViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersTeamViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTeamViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
