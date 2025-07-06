import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router
    /*, private authService: AuthService*/
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = null;
    this.success = null;

    // Simular login exitoso por ahora
    setTimeout(() => {
      this.loading = false;
      this.success = '¡Inicio de sesión exitoso! (Simulado)';

      // Guardar información del usuario
      const userInfo = {
        name: this.loginForm.value.username,
        username: this.loginForm.value.username
      };
      localStorage.setItem('currentUser', JSON.stringify(userInfo));
      localStorage.setItem('token', 'simulated-token');

      this.loginForm.reset();

      // Navegar al dashboard después del login exitoso
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1000);
    }, 1000);

    /*
    const { username, password } = this.loginForm.value;
    
    this.authService.login(username, password).subscribe({
      next: (res) => {
        this.loading = false;
        this.success = '¡Inicio de sesión exitoso!';
        
        // Guardar información del usuario
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        localStorage.setItem('token', res.token);
        
        this.loginForm.reset();
        
        // Navegar al dashboard después del login exitoso
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Error de autenticación';
        console.error('Error de login:', err);
      }
    });
    */
  }
}
