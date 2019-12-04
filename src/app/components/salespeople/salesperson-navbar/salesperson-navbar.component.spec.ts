import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalespersonNavbarComponent } from './salesperson-navbar.component';

describe('SalespersonNavbarComponent', () => {
  let component: SalespersonNavbarComponent;
  let fixture: ComponentFixture<SalespersonNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalespersonNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalespersonNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
