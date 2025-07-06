import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../models/student.interface';

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
} 