import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsRequestedComponent } from './ingredients-requested.component';

describe('IngredientsRequestedComponent', () => {
  let component: IngredientsRequestedComponent;
  let fixture: ComponentFixture<IngredientsRequestedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientsRequestedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsRequestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
