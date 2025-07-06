import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { TeacherListComponent } from './pages/teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './pages/teacher-detail/teacher-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TeachersComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: TeacherListComponent },
      { path: ':id/detail', component: TeacherDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
