import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestCartComponent } from './guest-cart.component';

describe('GuestCartComponent', () => {
  let component: GuestCartComponent;
  let fixture: ComponentFixture<GuestCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
