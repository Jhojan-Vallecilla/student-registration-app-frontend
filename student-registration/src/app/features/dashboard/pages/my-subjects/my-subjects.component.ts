import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/core/services/students.service';
import { SharedSubjectsResponse } from 'src/app/core/models';

interface EnrolledSubject {
  name: string;
  credits: number;
  teacher?: { name: string };
  classmates: string[];
}

@Component({
  selector: 'app-my-subjects',
  templateUrl: './my-subjects.component.html',
  styleUrls: ['./my-subjects.component.scss']
})
export class MySubjectsComponent implements OnInit {
  loading = false;
  enrolledSubjects: EnrolledSubject[] = [];
  totalCredits = 0;
  totalClassmates = 0;

  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    this.loadMySubjects();
  }

  loadMySubjects() {
    this.loading = true;
    
    // Obtener el ID del estudiante actual desde localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const studentId = currentUser.id || 1; // Por defecto ID 1 para pruebas

    this.studentsService.getSharedSubjects(studentId).subscribe({
      next: (response: SharedSubjectsResponse[]) => {
        // Transformar la respuesta del backend al formato que necesita el template
        this.enrolledSubjects = response.map(item => ({
          name: item.subjectName,
          credits: 3, // Todas las materias tienen 3 créditos según las reglas
          teacher: { name: 'Por asignar' }, // Por ahora placeholder
          classmates: item.sharedWith
        }));
        this.calculateTotals();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando materias:', error);
        this.loading = false;
      }
    });
  }

  calculateTotals() {
    this.totalCredits = this.enrolledSubjects.reduce((total, subject) => total + subject.credits, 0);
    
    // Calcular total de compañeros únicos
    const allClassmates = new Set<string>();
    this.enrolledSubjects.forEach(subject => {
      if (subject.classmates && Array.isArray(subject.classmates)) {
        subject.classmates.forEach((classmate: string) => {
          allClassmates.add(classmate);
        });
      }
    });
    this.totalClassmates = allClassmates.size;
  }
} 