import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPaginationComponent } from './task-pagination.component';

describe('TaskPaginationComponent', () => {
  let component: TaskPaginationComponent;
  let fixture: ComponentFixture<TaskPaginationComponent>;

  const value = new Date().valueOf();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test decrease method', () => {
    component.gotDate = new Date();
    component.decrease();
    expect(component.gotDate.valueOf()).toBeLessThan(value);
  });

  it('should test increase method', () => {
    component.gotDate = new Date();
    component.increase();
    expect(component.gotDate.valueOf()).toBeGreaterThan(value);
  });
});
