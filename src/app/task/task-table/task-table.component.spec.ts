import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTableComponent } from './task-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { Task } from 'src/app/shared/task.model';

describe('TaskTableComponent', () => {
  let component: TaskTableComponent;
  let fixture: ComponentFixture<TaskTableComponent>;

  const fireAuthStub = {
    authState: new BehaviorSubject(true)
  };
  const firestoreStub = {
    collection: (name: string) => ({
      doc: (_id: string) => ({
        valueChanges: () => new BehaviorSubject({ foo: 'bar'}),
        set: (_d: any) => new Promise((resolve, _reject) => resolve()),
      }),
    }),
  };
  const testTask: Task = {
    task: 'testing',
    startTime: {
      hour: 9,
      minute: 0
    },
    endTime: {
      hour: 10,
      minute: 0
    },
    taskMins: 60,
    isEditable: false,
    day: '8/10/2020',
    uid: 'testUID'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskTableComponent ],
      providers: [
        {provide: AngularFirestore, useValue: firestoreStub},
        {provide: AngularFireAuth, useValue: fireAuthStub}
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test addNewTask method', () => {
    component.addNewTask();
    expect(component.newRow).toBeTrue();
  });

  it('should test changeTaskMins method', async () => {
    component.changeTaskMins(component.addTaskForm);
    component.addTaskForm.patchValue({startTime: {hour: 12, minute: 0}});
    component.addTaskForm.patchValue({endTime: {hour: 13, minute: 0}});
    fixture.detectChanges();
    expect(component.addTaskForm.get('taskMins').value).toBe(60);
  });

  it('should test triggerEdit', () => {
    component.taskArray = [];
    component.taskArray.push(testTask);
    component.triggerEdit(testTask);
    expect(testTask.isEditable).toBeTrue();
    expect(component.updatingForm.get('task').value).toBe('testing');
    expect(component.counter).toBe(1);
  });
});
