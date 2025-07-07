import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject, SubjectCreateDto, SubjectUpdateDto } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private apiUrl = 'http://localhost:5123/api';

  constructor(private http: HttpClient) { }

  // Obtener todas las materias
  getAllSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/subjects`);
  }

  // Obtener una materia por ID
  getSubjectById(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.apiUrl}/subjects/${id}`);
  }

  // Crear una nueva materia
  createSubject(subject: SubjectCreateDto): Observable<Subject> {
    return this.http.post<Subject>(`${this.apiUrl}/subjects`, subject);
  }

  // Actualizar una materia
  updateSubject(id: number, subject: SubjectUpdateDto): Observable<Subject> {
    return this.http.put<Subject>(`${this.apiUrl}/subjects/${id}`, subject);
  }

  // Eliminar una materia
  deleteSubject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/subjects/${id}`);
  }
} 