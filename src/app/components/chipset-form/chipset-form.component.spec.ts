import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsetFormComponent } from './chipset-form.component';

describe('ChipsetFormComponent', () => {
  let component: ChipsetFormComponent;
  let fixture: ComponentFixture<ChipsetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipsetFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
