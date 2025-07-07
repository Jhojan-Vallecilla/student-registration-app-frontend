import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from './dashboard.component';
import { StudentsService } from 'src/app/core/services/students.service';
import { SubjectsService } from 'src/app/core/services/subjects.service';
import { TeachersService } from 'src/app/core/services/teachers.service';

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatMenuModule
    ],
    providers: [
        StudentsService,
        SubjectsService,
        TeachersService
    ],
    exports: [DashboardComponent]
})
export class DashboardModule { } 