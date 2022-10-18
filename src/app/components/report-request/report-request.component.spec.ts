import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRequestComponent } from './report-request.component';

describe('ReportRequestComponent', () => {
  let component: ReportRequestComponent;
  let fixture: ComponentFixture<ReportRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
