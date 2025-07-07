import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthResponse } from 'src/app/core/models/auth-response.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    
    // Asegurar que el formulario esté limpio al inicializar
    this.loginForm.reset();
  }

  ngOnInit() {
    // Limpiar cualquier valor que pueda haber quedado del navegador
    this.loginForm.patchValue({
      username: '',
      password: ''
    });
  }

  onSubmit() {
    // Validar que los campos no estén vacíos
    if (!this.loginForm.value.username || !this.loginForm.value.password) {
      this.error = 'Por favor, completa todos los campos';
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = null;

    const { username, password } = this.loginForm.value;
    
    this.authService.login(username, password).subscribe({
      next: (res: AuthResponse) => {
        this.loading = false;
        
        // Guardar información del usuario
        const userInfo = {
          name: username,
          username: username
        };
        localStorage.setItem('currentUser', JSON.stringify(userInfo));
        
        // Navegar inmediatamente al dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Error de autenticación';
        console.error('Error de login:', err);
      }
    });
  }
}
