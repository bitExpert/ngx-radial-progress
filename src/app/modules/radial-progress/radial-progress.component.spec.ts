import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadialProgressComponent } from './radial-progress.component';

describe('RadialProgressComponent', () => {
  let component: RadialProgressComponent;
  let fixture: ComponentFixture<RadialProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadialProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadialProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
