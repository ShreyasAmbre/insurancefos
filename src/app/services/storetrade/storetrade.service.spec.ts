import { TestBed } from '@angular/core/testing';

import { StoretradeService } from './storetrade.service';

describe('StoretradeService', () => {
  let service: StoretradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoretradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
