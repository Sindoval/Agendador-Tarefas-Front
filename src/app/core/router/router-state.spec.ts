import { TestBed } from '@angular/core/testing';

import { RouterState } from './router-state';

describe('RouterState', () => {
  let service: RouterState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
