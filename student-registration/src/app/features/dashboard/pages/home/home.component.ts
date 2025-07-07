import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/core/services/students.service';
import { SubjectsService } from 'src/app/core/services/subjects.service';
import { TeachersService } from 'src/app/core/services/teachers.service';

interface DashboardStats {
  students: number;
  subjects: number;
  teachers: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stats: DashboardStats = {
    students: 0,
    subjects: 0,
    teachers: 0
  };
  loading = false;

  constructor(
    private studentsService: StudentsService,
    private subjectsService: SubjectsService,
    private teachersService: TeachersService
  ) { }

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats() {
    this.loading = true;

    // Cargar estadísticas de estudiantes
    this.studentsService.getStudentsWithSubjects().subscribe({
      next: (students) => {
        this.stats.students = students.length;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando estudiantes:', error);
        this.stats.students = 0;
      }
    });

    // Cargar estadísticas de materias
    this.subjectsService.getAllSubjects().subscribe({
      next: (subjects) => {
        this.stats.subjects = subjects.length;
      },
      error: (error) => {
        console.error('Error cargando materias:', error);
        this.stats.subjects = 0;
      }
    });

    // Cargar estadísticas de profesores
    this.teachersService.getAllTeachers().subscribe({
      next: (teachers) => {
        this.stats.teachers = teachers.length;
      },
      error: (error) => {
        console.error('Error cargando profesores:', error);
        this.stats.teachers = 0;
      }
    });
  }
}
