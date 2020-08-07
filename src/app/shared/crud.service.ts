import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private fs: AngularFirestore) { }

  getTask(day: string, uid: string) {
    const query = this.fs.collection('tasks', ref => {
      return ref.where('uid', '==', uid)
                .where('day', '==', day);
    });
    return query.snapshotChanges();
  }

  getTaskForCalendar(uid: string) {
    const query = this.fs.collection('tasks', ref => {
      return ref.where('uid', '==', uid);
    });
    return query.snapshotChanges();
  }

  addTask(data: Task) {
    const ref = this.fs.collection('tasks');
    delete data.id;
    ref.add({...data});
  }

  delete(id: string) {
    this.fs.doc('tasks/' + id).delete();
  }

  edit(id: string, data: Task) {
    const ref = this.fs.doc('tasks/' + id);
    delete data.id;
    ref.update({...data});
  }
}
