import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeachersService } from '../../services/teachers.service';
import { Teacher, Subject } from '../../../students/models/student.interface';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss']
})
export class TeacherDetailComponent implements OnInit {
  teacher: Teacher | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teachersService: TeachersService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTeacher();
  }

  loadTeacher(): void {
    this.loading = true;
    const teacherId = Number(this.route.snapshot.paramMap.get('id'));

    if (!teacherId) {
      this.loading = false;
      return;
    }

    this.teachersService.getTeacher(teacherId).subscribe({
      next: (teacher) => {
        this.teacher = teacher;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando profesor:', error);
        this.loading = false;
        this.snackBar.open('Error al cargar el profesor', 'Cerrar', { duration: 3000 });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/teachers']);
  }

  editTeacher(): void {
    if (this.teacher) {
      this.router.navigate(['/teachers', this.teacher.id, 'edit']);
    }
  }

  deleteTeacher(): void {
    if (this.teacher && confirm(`¿Estás seguro de eliminar al profesor "${this.teacher.name}"?`)) {
      this.teachersService.deleteTeacher(this.teacher.id).subscribe({
        next: () => {
          this.snackBar.open('Profesor eliminado correctamente', 'Cerrar', { duration: 3000 });
          this.goBack();
        },
        error: (error) => {
          console.error('Error eliminando profesor:', error);
          this.snackBar.open('Error al eliminar profesor', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  viewSubject(subject: Subject): void {
    this.router.navigate(['/subjects', subject.id, 'detail']);
  }
}
