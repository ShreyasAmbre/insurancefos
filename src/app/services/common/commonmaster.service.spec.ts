import { TestBed } from '@angular/core/testing';

import { CommonmasterService } from './commonmaster.service';

describe('CommonmasterService', () => {
  let service: CommonmasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonmasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
