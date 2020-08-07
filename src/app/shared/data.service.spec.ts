import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test setDateSubject', () => {
    service.setDateSubject(new Date(2000, 1, 1));
    service.dateObservable.subscribe(value => {
      expect(value).toEqual(new Date(2000, 1, 1));
    });
  });
});
