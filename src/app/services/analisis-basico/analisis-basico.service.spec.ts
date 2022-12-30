import { TestBed } from '@angular/core/testing';

import { AnalisisBasicoService } from './analisis-basico.service';

describe('AnalisisBasicoService', () => {
  let service: AnalisisBasicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalisisBasicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
