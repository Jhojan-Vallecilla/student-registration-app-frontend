import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  private apiUrl = 'http://localhost:5123/api';

  constructor(private http: HttpClient) { }

  // Obtener todos los profesores
  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.apiUrl}/teachers`);
  }
} 