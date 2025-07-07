import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubjectsService } from '../../services/subjects.service';
import { TeachersService } from '../../../teachers/services/teachers.service';
import { Subject, Teacher } from '../../../students/models/student.interface';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {
  subjects: Subject[] = [];
  teachers: Teacher[] = [];
  loading = false;
  displayedColumns: string[] = ['name', 'credits', 'teacher', 'actions'];

  constructor(
    private subjectsService: SubjectsService,
    private teachersService: TeachersService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.loading = true;
    // Load both subjects and teachers
    this.subjectsService.getSubjects().subscribe({
      next: (subjects) => {
        this.subjects = subjects;
        // After loading subjects, load teachers to map the data
        this.loadTeachers();
      },
      error: (error) => {
        console.error('Error cargando materias:', error);
        this.loading = false;
        this.snackBar.open('Error al cargar materias', 'Cerrar', { duration: 3000 });
      }
    });
  }

  loadTeachers(): void {
    this.teachersService.getTeachers().subscribe({
      next: (teachers: Teacher[]) => {
        this.teachers = teachers;
        this.mapTeachersToSubjects();
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error cargando profesores:', error);
        this.loading = false;
        this.snackBar.open('Error al cargar profesores', 'Cerrar', { duration: 3000 });
      }
    });
  }

  mapTeachersToSubjects(): void {
    // Create a map of teacher IDs to teacher objects
    const teacherMap = new Map<number, Teacher>();
    this.teachers.forEach(teacher => {
      teacherMap.set(teacher.id, teacher);
    });

    // Map teachers to subjects based on the subjects array in each teacher
    this.subjects.forEach(subject => {
      // Find the teacher who teaches this subject
      const teacher = this.teachers.find(t => 
        t.subjects && t.subjects.some(s => s.id === subject.id)
      );
      if (teacher) {
        subject.teacher = teacher;
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
