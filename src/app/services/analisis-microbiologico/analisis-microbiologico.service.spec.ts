import { TestBed } from '@angular/core/testing';

import { AnalisisMicrobiologicoService } from './analisis-microbiologico.service';

describe('AnalisisMicrobiologicoService', () => {
  let service: AnalisisMicrobiologicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalisisMicrobiologicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
