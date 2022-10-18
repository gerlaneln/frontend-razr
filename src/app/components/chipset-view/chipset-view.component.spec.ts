import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsetViewComponent } from './chipset-view.component';

describe('ChipsetViewComponent', () => {
  let component: ChipsetViewComponent;
  let fixture: ComponentFixture<ChipsetViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipsetViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
