import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubjectsService } from '../../services/subjects.service';
import { StudentsService } from '../../../students/services/students.service';
import { Subject, Student } from '../../../students/models/student.interface';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit {
  subject: Subject | null = null;
  enrolledStudents: Student[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subjectsService: SubjectsService,
    private studentsService: StudentsService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadSubject();
  }

  loadSubject(): void {
    this.loading = true;
    const subjectId = Number(this.route.snapshot.paramMap.get('id'));

    if (!subjectId) {
      this.loading = false;
      return;
    }

    this.subjectsService.getSubject(subjectId).subscribe({
      next: (subject) => {
        this.subject = subject;
        this.loadEnrolledStudents(subjectId);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando materia:', error);
        this.loading = false;
        this.snackBar.open('Error al cargar la materia', 'Cerrar', { duration: 3000 });
      }
    });
  }

  loadEnrolledStudents(subjectId: number): void {
    // Por ahora simulamos estudiantes inscritos
    // En el backend real, necesitaríamos un endpoint para obtener estudiantes por materia
    this.enrolledStudents = [
      {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan.perez@email.com',
        subjects: []
      },
      {
        id: 2,
        name: 'María García',
        email: 'maria.garcia@email.com',
        subjects: []
      }
    ];
  }

  goBack(): void {
    this.router.navigate(['/subjects']);
  }

  editSubject(): void {
    if (this.subject) {
      this.router.navigate(['/subjects', this.subject.id, 'edit']);
    }
  }

  deleteSubject(): void {
    if (this.subject && confirm(`¿Estás seguro de eliminar la materia "${this.subject.name}"?`)) {
      this.subjectsService.deleteSubject(this.subject.id).subscribe({
        next: () => {
          this.snackBar.open('Materia eliminada correctamente', 'Cerrar', { duration: 3000 });
          this.goBack();
        },
        error: (error) => {
          console.error('Error eliminando materia:', error);
          this.snackBar.open('Error al eliminar materia', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  viewStudent(student: Student): void {
    this.router.navigate(['/students', student.id, 'detail']);
  }
}
