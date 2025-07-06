import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatSidenav;
  currentUser: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    // Obtener el usuario del localStorage
    const user = localStorage.getItem('currentUser');
    if (user) {
      try {
        const userInfo = JSON.parse(user);
        this.currentUser = userInfo.name || userInfo.username || 'Usuario';
      } catch (error) {
        this.currentUser = 'Usuario';
      }
    } else {
      // Fallback si no hay usuario guardado
      this.currentUser = 'Admin Usuario';
    }
  }

  logout() {
    // Limpiar token y redirigir al login
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    console.log('Sesión cerrada');

    // Navegar de vuelta al login
    this.router.navigate(['/login']);
  }
}
