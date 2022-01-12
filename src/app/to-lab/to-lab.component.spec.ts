import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToLabComponent } from './to-lab.component';

describe('ToLabComponent', () => {
  let component: ToLabComponent;
  let fixture: ComponentFixture<ToLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToLabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
