import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeachersService } from '../../services/teachers.service';
import { Teacher } from '../../../students/models/student.interface';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit {
  teachers: Teacher[] = [];
  loading = false;
  displayedColumns: string[] = ['name', 'subjects', 'status', 'actions'];

  constructor(
    private teachersService: TeachersService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.loading = true;
    this.teachersService.getTeachers().subscribe({
      next: (teachers) => {
        this.teachers = teachers;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando profesores:', error);
        this.loading = false;
        this.snackBar.open('Error al cargar profesores', 'Cerrar', { duration: 3000 });
      }
    });
  }

  createTeacher(): void {
    this.router.navigate(['/teachers/create']);
  }

  viewTeacher(teacher: Teacher): void {
    this.router.navigate(['/teachers', teacher.id, 'detail']);
  }

  editTeacher(teacher: Teacher): void {
    this.router.navigate(['/teachers', teacher.id, 'edit']);
  }

  deleteTeacher(teacher: Teacher): void {
    if (confirm(`¿Estás seguro de eliminar al profesor "${teacher.name}"?`)) {
      this.teachersService.deleteTeacher(teacher.id).subscribe({
        next: () => {
          this.snackBar.open('Profesor eliminado correctamente', 'Cerrar', { duration: 3000 });
          this.loadTeachers();
        },
        error: (error) => {
          console.error('Error eliminando profesor:', error);
          this.snackBar.open('Error al eliminar profesor', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}
