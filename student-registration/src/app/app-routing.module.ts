import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HomeComponent } from './features/dashboard/pages/home/home.component';
import { MySubjectsComponent } from './features/dashboard/pages/my-subjects/my-subjects.component';
import { EnrollSubjectsComponent } from './features/dashboard/pages/enroll-subjects/enroll-subjects.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'my-subjects', component: MySubjectsComponent },
      { path: 'enroll-subjects', component: EnrollSubjectsComponent },
      { path: 'students', loadChildren: () => import('./features/students/students.module').then(m => m.StudentsModule) },
      { path: 'subjects', loadChildren: () => import('./features/subjects/subjects.module').then(m => m.SubjectsModule) },
      { path: 'teachers', loadChildren: () => import('./features/teachers/teachers.module').then(m => m.TeachersModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
