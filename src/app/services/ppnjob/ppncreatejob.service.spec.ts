import { TestBed } from '@angular/core/testing';

import { PpncreatejobService } from './ppncreatejob.service';

describe('PpncreatejobService', () => {
  let service: PpncreatejobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PpncreatejobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
