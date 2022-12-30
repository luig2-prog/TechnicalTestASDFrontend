import { TestBed } from '@angular/core/testing';

import { DataMaestraService } from './data-maestra.service';

describe('DataMaestraServiceService', () => {
  let service: DataMaestraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataMaestraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
