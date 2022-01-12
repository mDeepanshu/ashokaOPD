import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabRecieptComponent } from './lab-reciept.component';

describe('LabRecieptComponent', () => {
  let component: LabRecieptComponent;
  let fixture: ComponentFixture<LabRecieptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabRecieptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabRecieptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
