import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxoComponent } from './fluxo.component';

describe('FluxoComponent', () => {
  let component: FluxoComponent;
  let fixture: ComponentFixture<FluxoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluxoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
