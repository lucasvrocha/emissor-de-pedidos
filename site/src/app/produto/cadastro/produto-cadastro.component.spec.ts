import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCadastroComponent } from './produto-cadastro.component';

describe('ProdutoCadastroComponent', () => {
  let component: ProdutoCadastroComponent;
  let fixture: ComponentFixture<ProdutoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
