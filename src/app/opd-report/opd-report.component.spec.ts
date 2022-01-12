import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdReportComponent } from './opd-report.component';

describe('OpdReportComponent', () => {
  let component: OpdReportComponent;
  let fixture: ComponentFixture<OpdReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpdReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpdReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
