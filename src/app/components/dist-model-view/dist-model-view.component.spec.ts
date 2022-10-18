import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistModelViewComponent } from './dist-model-view.component';

describe('DistModelViewComponent', () => {
  let component: DistModelViewComponent;
  let fixture: ComponentFixture<DistModelViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistModelViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistModelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
