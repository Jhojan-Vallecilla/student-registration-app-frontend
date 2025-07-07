import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student, SharedSubjectsResponse } from '../models/student.interface';

interface StudentWithSubjects {
  id: number;
  name: string;
  subjects: string[];
}

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private apiUrl = 'http://localhost:5123/api';

  constructor(private http: HttpClient) { }

  // GET /api/students - Obtener todos los estudiantes
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/students`);
  }

  // GET /api/students/{id} - Obtener un estudiante por su ID
  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/students/${id}`);
  }

  // POST /api/students - Crear un nuevo estudiante
  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/students`, student);
  }

  // PUT /api/students/{id} - Actualizar los datos de un estudiante
  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/students/${id}`, student);
  }

  // DELETE /api/students/{id} - Eliminar un estudiante
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/students/${id}`);
  }

  // POST /api/students/{studentId}/assign-subjects - Asignar materias a un estudiante
  assignSubjects(studentId: number, subjectIds: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/students/${studentId}/assign-subjects`, subjectIds);
  }

  // GET /api/students/shared?studentId={id} - Obtener materias compartidas
  getSharedSubjects(studentId: number): Observable<SharedSubjectsResponse[]> {
    return this.http.get<SharedSubjectsResponse[]>(`${this.apiUrl}/students/shared?studentId=${studentId}`);
  }

  // GET /api/Students/with-subjects - Obtener estudiantes con sus materias inscritas
  getStudentsWithSubjects(): Observable<StudentWithSubjects[]> {
    return this.http.get<StudentWithSubjects[]>(`${this.apiUrl}/Students/with-subjects`);
  }
}
