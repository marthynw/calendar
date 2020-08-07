import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { BehaviorSubject } from 'rxjs';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  const fireAuthStub = {
    authState: new BehaviorSubject(true)
  };
  const firestoreStub = {
    collection: (name: string) => ({
      doc: (id: string) => ({
        valueChanges: () => new BehaviorSubject({ foo: 'bar'}),
        set: (d: any) => new Promise((resolve, _reject) => resolve()),
      }),
    }),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      providers: [
        {provide: AngularFireAuth, useValue: fireAuthStub},
        {provide: AngularFirestore, useValue: firestoreStub}
      ],
      imports: [
        AngularFireModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test correctSunday', () => {
    component.firstDayOfMonth = 0;
    component.correctSunday();
    expect(component.firstDayOfMonth).toBe(7);
  });

  it('should test decideDate', () => {
    component.changedDate = new Date(1992, 10);
    component.decideDate();
    expect(component.year).toBe(1992);
    expect(component.month).toBe(10);
  });

  it('should test onDate', () => {
    const date = new Date(2005, 5);
    component.onDate(date);
    expect(component.changedDate).not.toBeNull();
    expect(component.firstDayOfMonth).toBe(3);
    expect(component.lastDayOfMonth).toBe(30);
  });

});
