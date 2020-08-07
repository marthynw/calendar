import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NavComponent } from './nav/nav.component';
import { TableComponent } from './calendar/table/table.component';
import { PaginationComponent } from './calendar/table/pagination/pagination.component';
import { TaskComponent } from './task/task.component';
import { TaskTableComponent } from './task/task-table/task-table.component';
import { HomeComponent } from './home/home.component';
import { TaskPaginationComponent } from './task/task-table/task-pagination/task-pagination.component';

import { environment } from 'src/environments/environment';

import { CrudService } from './shared/crud.service';
import { AuthService } from './shared/auth.service';
import { DataService } from './shared/data.service';

import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    NavComponent,
    TableComponent,
    PaginationComponent,
    TaskComponent,
    TaskTableComponent,
    HomeComponent,
    TaskPaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    AngularFireDatabaseModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [DataService, CrudService, AuthService, AngularFireAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
