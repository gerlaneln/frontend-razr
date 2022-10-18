import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertTeamUsersComponent } from './insert-team-users.component';

describe('InsertTeamUsersComponent', () => {
  let component: InsertTeamUsersComponent;
  let fixture: ComponentFixture<InsertTeamUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertTeamUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertTeamUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
