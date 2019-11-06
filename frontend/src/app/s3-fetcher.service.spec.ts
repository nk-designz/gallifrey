import { TestBed } from '@angular/core/testing';

import { S3FetcherService } from './s3-fetcher.service';

describe('S3FetcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: S3FetcherService = TestBed.get(S3FetcherService);
    expect(service).toBeTruthy();
  });
});
