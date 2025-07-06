import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher, Subject } from '../../students/models/student.interface';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  private apiUrl = 'http://localhost:5123/api';

  constructor(private http: HttpClient) { }

  // GET /api/teachers - Obtener todos los profesores
  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.apiUrl}/teachers`);
  }

  // GET /api/teachers/{id} - Obtener un profesor por ID
  getTeacher(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/teachers/${id}`);
  }

  // POST /api/teachers - Crear un nuevo profesor
  createTeacher(teacher: Omit<Teacher, 'id'>): Observable<Teacher> {
    return this.http.post<Teacher>(`${this.apiUrl}/teachers`, teacher);
  }

  // PUT /api/teachers/{id} - Actualizar un profesor
  updateTeacher(id: number, teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.apiUrl}/teachers/${id}`, teacher);
  }

  // DELETE /api/teachers/{id} - Eliminar un profesor
  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/teachers/${id}`);
  }

  // GET /api/teachers/{id}/subjects - Obtener materias que imparte un profesor
  getTeacherSubjects(id: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/teachers/${id}/subjects`);
  }
}
