import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { openauthGuard } from './openauth.guard';

describe('openauthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => openauthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
