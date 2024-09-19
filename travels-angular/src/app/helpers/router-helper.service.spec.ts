import { TestBed } from '@angular/core/testing';

import { RouterHelperService } from './router-helper.service';

describe('RouterHelperService', () => {
  let service: RouterHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
