import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { TaskComponent } from './task/task.component';
import { HomeComponent } from './home/home.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'calendar', component: CalendarComponent,
   canActivate: [AngularFireAuthGuard]},
  {path: 'task', component: TaskComponent, canActivate: [AngularFireAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
