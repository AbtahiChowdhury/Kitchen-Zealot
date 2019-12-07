import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSuppliesComponent } from './request-supplies.component';

describe('RequestSuppliesComponent', () => {
  let component: RequestSuppliesComponent;
  let fixture: ComponentFixture<RequestSuppliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestSuppliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
