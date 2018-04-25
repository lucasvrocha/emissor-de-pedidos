import { TestBed, inject } from '@angular/core/testing';

import { CaixaService } from './caixa.service';

describe('CaixaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaixaService]
    });
  });

  it('should be created', inject([CaixaService], (service: CaixaService) => {
    expect(service).toBeTruthy();
  }));
});
