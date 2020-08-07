import { TestBed } from '@angular/core/testing';

import { CrudService } from './crud.service';
import { BehaviorSubject, of } from 'rxjs';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';

describe('CrudService', () => {
  let service: CrudService;

  const firestoreStub = {
    collection: (name: string) => ({
      doc: (_id: string) => ({
        valueChanges: () => new BehaviorSubject({ foo: 'bar'}),
        set: (_d: any) => new Promise((resolve, _reject) => resolve())
      })
    })
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AngularFirestore, useValue: firestoreStub}
      ],
      imports: [
        AngularFireModule,
        AngularFirestoreModule
      ]
    });
    service = TestBed.inject(CrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
