import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderIngredientsComponent } from './order-ingredients.component';

describe('OrderIngredientsComponent', () => {
  let component: OrderIngredientsComponent;
  let fixture: ComponentFixture<OrderIngredientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderIngredientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
