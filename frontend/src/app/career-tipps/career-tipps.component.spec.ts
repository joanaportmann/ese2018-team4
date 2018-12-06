import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerTippsComponent } from './career-tipps.component';

describe('CareerTippsComponent', () => {
  let component: CareerTippsComponent;
  let fixture: ComponentFixture<CareerTippsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerTippsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerTippsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
