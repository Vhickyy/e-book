import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { notAuthorGuard } from './not-author.guard';

describe('notAuthorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => notAuthorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
