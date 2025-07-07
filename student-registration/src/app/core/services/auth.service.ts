import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserLoginDto } from '../models/user-login.interface';
import { AuthResponse } from '../models/auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5123/api';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<AuthResponse> {
    const loginData: UserLoginDto = {
      username: username,
      password: password
    };
    
    return this.http.post<AuthResponse>(`${this.apiUrl}/Login`, loginData).pipe(
      tap(res => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }
}
