import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoListaComponent } from './lista/produto-lista.component';

describe('ProdutoComponent', () => {
  let component: ProdutoListaComponent;
  let fixture: ComponentFixture<ProdutoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
