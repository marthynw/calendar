import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../shared/crud.service';
import { Task } from '../../shared/task.model';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from '../../shared/data.service';
import { faEdit,
         faTrash,
         faSave,
         faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnInit {
  updatingForm: FormGroup;
  addTaskForm: FormGroup;
  uid: string;
  sentStringDate: string;
  sentDate: Date;
  newRow = false;
  tempTask: Task;
  taskArray: Task[];
  counter = 0;

  faEdit = faEdit;
  faTrash = faTrash;
  faSave = faSave;
  faTimes = faTimes;

  constructor(private fb: FormBuilder,
              private crud: CrudService,
              private auth: AuthService,
              private data: DataService
              ) { }

  ngOnInit(): void {
    this.data.dateObservable.subscribe(value => {
      this.sentDate = value;
    });
    this.sentStringDate = this.sentDate.toLocaleDateString('en-US');
    this.updatingForm = this.fb.group({
      task: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      taskMins: ({value: '', disabled: true}),
    });
    this.addTaskForm = this.fb.group({
      task: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      taskMins: ({value: '', disabled: true}),
    });
    this.changeTaskMins(this.updatingForm);
    this.changeTaskMins(this.addTaskForm);
    this.auth.getUID();
    this.auth.uid$.subscribe(value => {
      this.uid = value;
      if (this.uid) {
        this.readTask();
      }
    });
  }

  changeTaskMins(form: FormGroup) {
    form.valueChanges.subscribe(val => {
      if (form.controls.startTime.valid &&
          form.controls.endTime.valid) {
        form.patchValue({taskMins:
          (val.endTime.hour - val.startTime.hour) * 60 +
          (val.endTime.minute - val.startTime.minute)}, {emitEvent: false});
        }
    });
  }

  readTask() {
    this.crud.getTask(this.sentStringDate, this.uid).subscribe(anArray => {
      this.taskArray = anArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Task
        };
      });
    });
  }

  onEdit(id: string, task: Task) {
    task.isEditable = false;
    this.crud.edit(id, task);
    this.changeEditable(task);
    this.counter--;
  }

  cancel(task: Task) {
    this.changeEditable(task);
    this.counter--;
  }

  changeEditable(task: Task) {
    task.isEditable = !task.isEditable;
  }

  triggerEdit(task: Task) {
    this.changeEditable(task);
    this.updatingForm.patchValue(task);
    this.increaseCounter();
  }

  increaseCounter() {
    for (const element of this.taskArray) {
      if (element.isEditable === true) {
        this.counter++;
      }
    }
  }

  onDelete(id: string) {
    this.crud.delete(id);
  }

  addNewTask() {
    this.newRow = !this.newRow;
  }

  onSubmit() {
    this.tempTask = this.addTaskForm.getRawValue();
    this.tempTask.uid = this.uid;
    this.tempTask.isEditable = false,
    this.tempTask.day = this.sentStringDate,
    this.crud.addTask(this.tempTask);
    this.addTaskForm.reset();
    this.newRow = false;
  }

  changeDay(date: Date) {
    this.sentDate = date;
    this.sentStringDate = this.sentDate.toLocaleDateString('en-US');
    this.taskArray.length = 0;
    this.readTask();
  }

}
