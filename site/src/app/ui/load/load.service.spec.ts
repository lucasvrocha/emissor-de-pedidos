import { TestBed, inject } from '@angular/core/testing';

import { LoadService } from './load.service';

describe('LoadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadService]
    });
  });

  it('should be created', inject([LoadService], (service: LoadService) => {
    expect(service).toBeTruthy();
  }));
});
