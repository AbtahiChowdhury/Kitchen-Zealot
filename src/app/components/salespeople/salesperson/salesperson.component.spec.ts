import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalespersonComponent } from './salesperson.component';

describe('SalespersonComponent', () => {
  let component: SalespersonComponent;
  let fixture: ComponentFixture<SalespersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalespersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalespersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
