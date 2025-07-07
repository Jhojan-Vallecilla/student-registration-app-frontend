import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectsService } from 'src/app/core/services/subjects.service';
import { StudentsService } from 'src/app/core/services/students.service';
import { Subject } from 'src/app/core/models';

interface ValidationMessage {
  text: string;
  type: 'error' | 'warning';
}

interface SubjectWithEnrollment extends Subject {
  enrolledStudents?: number;
}

@Component({
  selector: 'app-enroll-subjects',
  templateUrl: './enroll-subjects.component.html',
  styleUrls: ['./enroll-subjects.component.scss']
})
export class EnrollSubjectsComponent implements OnInit {
  loading = false;
  availableSubjects: SubjectWithEnrollment[] = [];
  selectedSubjects: SubjectWithEnrollment[] = [];
  validationMessages: ValidationMessage[] = [];
  showConfirmation = false;
  currentEnrolledSubjects: any[] = [];
  maxSubjectsAllowed = 3;
  alreadyHasMaxSubjects = false;

  constructor(
    private subjectsService: SubjectsService,
    private studentsService: StudentsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCurrentEnrolledSubjects();
  }

  loadCurrentEnrolledSubjects() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const studentId = currentUser.id || 1;

    this.studentsService.getSharedSubjects(studentId).subscribe({
      next: (response) => {
        this.currentEnrolledSubjects = response;
        this.checkEnrollmentStatus();
        this.loadAvailableSubjects();
      },
      error: (error) => {
        console.error('Error cargando materias inscritas:', error);
        this.loadAvailableSubjects();
      }
    });
  }

  checkEnrollmentStatus() {
    if (this.currentEnrolledSubjects.length >= this.maxSubjectsAllowed) {
      this.alreadyHasMaxSubjects = true;
      // No agregar mensaje a validationMessages aquí
    }
  }

  loadAvailableSubjects() {
    this.loading = true;
    this.subjectsService.getAllSubjects().subscribe({
      next: (subjects) => {
        this.availableSubjects = subjects.map(subject => ({
          ...subject,
          enrolledStudents: Math.floor(Math.random() * 10) // Simulado para demo
        }));
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando materias:', error);
        this.loading = false;
      }
    });
  }

  toggleSubject(subject: SubjectWithEnrollment) {
    if (this.alreadyHasMaxSubjects) {
      return; // No permitir selección si ya tiene máximo de materias
    }

    if (this.isSubjectSelected(subject)) {
      this.removeSubject(subject);
    } else {
      this.addSubject(subject);
    }
  }

  addSubject(subject: SubjectWithEnrollment) {
    if (this.alreadyHasMaxSubjects) {
      return;
    }

    if (this.selectedSubjects.length >= 3) {
      this.addValidationMessage('Ya has seleccionado el máximo de 3 materias', 'error');
      return;
    }

    // Validar que no haya materias con el mismo profesor
    if (this.hasSameTeacher(subject)) {
      const teacherName = this.getTeacherName(subject);
      this.addValidationMessage(`No puedes seleccionar dos materias con el mismo profesor (${teacherName})`, 'error');
      return;
    }

    this.selectedSubjects.push(subject);
    this.updateValidationMessages();
  }

  removeSubject(subject: SubjectWithEnrollment) {
    this.selectedSubjects = this.selectedSubjects.filter(s => s.id !== subject.id);
    this.updateValidationMessages();
  }

  isSubjectSelected(subject: SubjectWithEnrollment): boolean {
    return this.selectedSubjects.some(s => s.id === subject.id);
  }

  isSubjectDisabled(subject: SubjectWithEnrollment): boolean {
    return this.alreadyHasMaxSubjects || (this.selectedSubjects.length >= 3 && !this.isSubjectSelected(subject));
  }

  hasSameTeacher(subject: SubjectWithEnrollment): boolean {
    const subjectTeacherIds = this.getTeacherIds(subject);
    return this.selectedSubjects.some(selectedSubject => {
      const selectedTeacherIds = this.getTeacherIds(selectedSubject);
      return subjectTeacherIds.some(id => selectedTeacherIds.includes(id));
    });
  }

  getTeacherIds(subject: SubjectWithEnrollment): number[] {
    if (subject.teachers && subject.teachers.length > 0) {
      return subject.teachers.map(t => t.id);
    }
    if (subject.teacher) {
      return [subject.teacher.id];
    }
    return [];
  }

  getTeacherName(subject: SubjectWithEnrollment): string {
    if (subject.teachers && subject.teachers.length > 0) {
      return subject.teachers[0].name;
    }
    if (subject.teacher) {
      return subject.teacher.name;
    }
    return 'Sin asignar';
  }

  get currentEnrolledCount(): number {
    return this.currentEnrolledSubjects.length;
  }

  get totalSelectedCredits(): number {
    return this.selectedSubjects.reduce((total, subject) => total + subject.credits, 0);
  }

  canEnroll(): boolean {
    return !this.alreadyHasMaxSubjects && this.selectedSubjects.length === 3;
  }

  updateValidationMessages() {
    this.validationMessages = [];

    if (this.selectedSubjects.length < 3) {
      this.addValidationMessage('Debes seleccionar exactamente 3 materias para poder inscribir', 'warning');
    }

    if (this.selectedSubjects.length > 3) {
      this.addValidationMessage('No puedes seleccionar más de 3 materias', 'error');
    }

    // Validar profesores únicos
    const teacherIds = this.selectedSubjects.flatMap(s => this.getTeacherIds(s));
    const uniqueTeacherIds = new Set(teacherIds);
    if (teacherIds.length !== uniqueTeacherIds.size) {
      this.addValidationMessage('No puedes tener materias con el mismo profesor', 'error');
    }
  }

  addValidationMessage(text: string, type: 'error' | 'warning') {
    this.validationMessages.push({ text, type });
  }

  confirmEnrollment() {
    if (this.canEnroll()) {
      this.showConfirmation = true;
    }
  }

  cancelConfirmation() {
    this.showConfirmation = false;
  }

  enrollSubjects() {
    this.loading = true;
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const studentId = currentUser.id || 1;
    const subjectIds = this.selectedSubjects.map(s => s.id);

    this.studentsService.assignSubjects(studentId, subjectIds).subscribe({
      next: () => {
        this.loading = false;
        this.showConfirmation = false;
        this.addValidationMessage('Materias inscritas correctamente', 'warning');
        setTimeout(() => {
          this.router.navigate(['/dashboard/my-subjects']);
        }, 1500);
      },
      error: (error) => {
        console.error('Error inscribiendo materias:', error);
        this.loading = false;
        this.showConfirmation = false;
        
        // Manejar el mensaje específico del backend
        if (error.error && error.error.includes('Must assign exactly 3 distinct subjects with different teachers')) {
          this.addValidationMessage('No puedes inscribir materias con el mismo profesor. Selecciona materias con profesores diferentes.', 'error');
        } else {
          this.addValidationMessage('Error al inscribir las materias. Inténtalo de nuevo.', 'error');
        }
      }
    });
  }
} 