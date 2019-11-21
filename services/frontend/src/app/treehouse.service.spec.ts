import { TestBed } from '@angular/core/testing';

import { TreehouseService } from './treehouse.service';

describe('TreehouseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TreehouseService = TestBed.get(TreehouseService);
    expect(service).toBeTruthy();
  });
});
