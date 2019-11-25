import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderComponent } from './view-order.component';

describe('ViewOrderComponent', () => {
  let component: ViewOrderComponent;
  let fixture: ComponentFixture<ViewOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
