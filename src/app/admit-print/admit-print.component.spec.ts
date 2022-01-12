import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmitPrintComponent } from './admit-print.component';

describe('AdmitPrintComponent', () => {
  let component: AdmitPrintComponent;
  let fixture: ComponentFixture<AdmitPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmitPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmitPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
