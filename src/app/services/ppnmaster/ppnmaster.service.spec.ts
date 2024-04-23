import { TestBed } from '@angular/core/testing';

import { PpnmasterService } from './ppnmaster.service';

describe('PpnmasterService', () => {
  let service: PpnmasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PpnmasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
