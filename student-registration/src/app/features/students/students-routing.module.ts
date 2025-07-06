import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentFormComponent } from './pages/student-form/student-form.component';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: StudentListComponent },
      { path: 'create', component: StudentFormComponent },
      { path: ':id/edit', component: StudentFormComponent },
      { path: ':id/detail', component: StudentDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
