import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectsComponent } from './subjects.component';
import { SubjectListComponent } from './pages/subject-list/subject-list.component';
import { SubjectDetailComponent } from './pages/subject-detail/subject-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SubjectsComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: SubjectListComponent },
      { path: ':id/detail', component: SubjectDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule { }
