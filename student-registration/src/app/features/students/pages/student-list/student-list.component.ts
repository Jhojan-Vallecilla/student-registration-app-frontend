import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../models/student.interface';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  loading = false;
  displayedColumns: string[] = ['name', 'email', 'subjects', 'actions'];

  constructor(
    private studentsService: StudentsService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true;
    this.studentsService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando estudiantes:', error);
        this.loading = false;
        this.snackBar.open('Error al cargar estudiantes', 'Cerrar', { duration: 3000 });
      }
    });
  }

  createStudent(): void {
    this.router.navigate(['/students/create']);
  }

  viewStudent(student: Student): void {
    this.router.navigate(['/students', student.id, 'detail']);
  }

  editStudent(student: Student): void {
    this.router.navigate(['/students', student.id, 'edit']);
  }

  deleteStudent(student: Student): void {
    if (confirm(`¿Estás seguro de eliminar a ${student.name}?`)) {
      this.studentsService.deleteStudent(student.id!).subscribe({
        next: () => {
          this.snackBar.open('Estudiante eliminado correctamente', 'Cerrar', { duration: 3000 });
          this.loadStudents();
        },
        error: (error) => {
          console.error('Error eliminando estudiante:', error);
          this.snackBar.open('Error al eliminar estudiante', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}
