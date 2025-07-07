import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  Student, 
  StudentCreateDto, 
  StudentUpdateDto, 
  SharedSubjectsResponse,
  StudentWithSubjects
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private apiUrl = 'http://localhost:5123/api';

  constructor(private http: HttpClient) { }

  // Obtener todos los estudiantes
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/students`);
  }

  // Obtener un estudiante por ID
  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/students/${id}`);
  }

  // Crear un nuevo estudiante
  createStudent(student: StudentCreateDto): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/students`, student);
  }

  // Actualizar un estudiante
  updateStudent(id: number, student: StudentUpdateDto): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/students/${id}`, student);
  }

  // Eliminar un estudiante
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/students/${id}`);
  }

  // Asignar materias a un estudiante
  assignSubjects(studentId: number, subjectIds: number[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/Students/${studentId}/assign-subjects`, subjectIds);
  }

  // Obtener materias compartidas con compañeros
  getSharedSubjects(studentId: number): Observable<SharedSubjectsResponse[]> {
    return this.http.get<SharedSubjectsResponse[]>(`${this.apiUrl}/Students/${studentId}/shared`);
  }

  // Obtener estudiantes con sus materias inscritas
  getStudentsWithSubjects(): Observable<StudentWithSubjects[]> {
    return this.http.get<StudentWithSubjects[]>(`${this.apiUrl}/Students/with-subjects`);
  }
} 