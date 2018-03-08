import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { navbarComponent } from './navbar.component';

describe('navbarComponent', () => {
  let component: navbarComponent;
  let fixture: ComponentFixture<navbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ navbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(navbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
