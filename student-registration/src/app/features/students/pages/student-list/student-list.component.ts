import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentsService } from '../../services/students.service';

interface StudentWithSubjects {
  id: number;
  name: string;
  subjects: string[];
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: StudentWithSubjects[] = [];
  loading = false;
  displayedColumns: string[] = ['name', 'subjects', 'actions'];
  currentUserId: number = 0;

  constructor(
    private studentsService: StudentsService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadStudents();
  }

  loadCurrentUser(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserId = currentUser.id || 0;
  }

  isCurrentUser(student: StudentWithSubjects): boolean {
    return student.id === this.currentUserId;
  }

  getDisplayName(student: StudentWithSubjects): string {
    if (this.isCurrentUser(student)) {
      return `${student.name} (yo)`;
    }
    return student.name;
  }

  loadStudents(): void {
    this.loading = true;
    this.studentsService.getStudentsWithSubjects().subscribe({
      next: (students: StudentWithSubjects[]) => {
        this.students = students;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error cargando estudiantes:', error);
        this.loading = false;
        this.snackBar.open('Error al cargar estudiantes', 'Cerrar', { duration: 3000 });
      }
    });
  }

  viewStudent(student: StudentWithSubjects): void {
    this.router.navigate(['/students', student.id, 'detail']);
  }
}
