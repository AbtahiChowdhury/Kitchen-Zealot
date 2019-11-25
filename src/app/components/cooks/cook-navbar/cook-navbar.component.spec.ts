import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookNavbarComponent } from './cook-navbar.component';

describe('CookNavbarComponent', () => {
  let component: CookNavbarComponent;
  let fixture: ComponentFixture<CookNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
