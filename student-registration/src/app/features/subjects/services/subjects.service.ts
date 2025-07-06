import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject, Teacher } from '../../students/models/student.interface';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private apiUrl = 'http://localhost:5123/api';

  constructor(private http: HttpClient) { }

  // GET /api/subjects - Obtener todas las materias
  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/subjects`);
  }

  // GET /api/subjects/{id} - Obtener una materia por ID
  getSubject(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.apiUrl}/subjects/${id}`);
  }

  // POST /api/subjects - Crear una nueva materia
  createSubject(subject: Omit<Subject, 'id'>): Observable<Subject> {
    return this.http.post<Subject>(`${this.apiUrl}/subjects`, subject);
  }

  // PUT /api/subjects/{id} - Actualizar una materia
  updateSubject(id: number, subject: Subject): Observable<Subject> {
    return this.http.put<Subject>(`${this.apiUrl}/subjects/${id}`, subject);
  }

  // DELETE /api/subjects/{id} - Eliminar una materia
  deleteSubject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/subjects/${id}`);
  }

  // GET /api/teachers - Obtener todos los profesores (para asignar a materias)
  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.apiUrl}/teachers`);
  }
}
