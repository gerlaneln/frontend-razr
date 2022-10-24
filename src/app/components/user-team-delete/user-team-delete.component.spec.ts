import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTeamDeleteComponent } from './user-team-delete.component';

describe('UserTeamDeleteComponent', () => {
  let component: UserTeamDeleteComponent;
  let fixture: ComponentFixture<UserTeamDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTeamDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTeamDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
