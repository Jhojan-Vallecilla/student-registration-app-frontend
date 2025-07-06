import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubjectsService } from '../../services/subjects.service';
import { Subject } from '../../../students/models/student.interface';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {
  subjects: Subject[] = [];
  loading = false;
  displayedColumns: string[] = ['name', 'credits', 'teacher', 'status', 'actions'];

  constructor(
    private subjectsService: SubjectsService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.loading = true;
    this.subjectsService.getSubjects().subscribe({
      next: (subjects) => {
        this.subjects = subjects;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando materias:', error);
        this.loading = false;
        this.snackBar.open('Error al cargar materias', 'Cerrar', { duration: 3000 });
      }
    });
  }

  createSubject(): void {
    this.router.navigate(['/subjects/create']);
  }

  viewSubject(subject: Subject): void {
    this.router.navigate(['/subjects', subject.id, 'detail']);
  }

  editSubject(subject: Subject): void {
    this.router.navigate(['/subjects', subject.id, 'edit']);
  }

  deleteSubject(subject: Subject): void {
    if (confirm(`¿Estás seguro de eliminar la materia "${subject.name}"?`)) {
      this.subjectsService.deleteSubject(subject.id).subscribe({
        next: () => {
          this.snackBar.open('Materia eliminada correctamente', 'Cerrar', { duration: 3000 });
          this.loadSubjects();
        },
        error: (error) => {
          console.error('Error eliminando materia:', error);
          this.snackBar.open('Error al eliminar materia', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}
