import { TestBed, inject } from '@angular/core/testing';

import { FornecedorService } from './fornecedor.service';

describe('FornecedorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FornecedorService]
    });
  });

  it('should be created', inject([FornecedorService], (service: FornecedorService) => {
    expect(service).toBeTruthy();
  }));
});
