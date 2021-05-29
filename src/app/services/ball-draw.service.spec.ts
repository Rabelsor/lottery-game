import { TestBed } from '@angular/core/testing';

import { BallDrawService } from './ball-draw.service';

describe('BallDrawService', () => {
  let service: BallDrawService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BallDrawService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
