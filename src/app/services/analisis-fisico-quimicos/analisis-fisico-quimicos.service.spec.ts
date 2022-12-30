import { TestBed } from '@angular/core/testing';

import { AnalisisFisicoQuimicosService } from './analisis-fisico-quimicos.service';

describe('AnalisisFisicoQuimicosService', () => {
  let service: AnalisisFisicoQuimicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalisisFisicoQuimicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
