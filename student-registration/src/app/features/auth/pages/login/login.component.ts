import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
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
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next: (res) => {
        this.loading = false;
        this.success = '¡Inicio de sesión exitoso!';
        this.loginForm.reset();
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Error de autenticación';
      }
    });
  }
}
