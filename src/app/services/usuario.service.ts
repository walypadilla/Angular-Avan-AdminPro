import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login.interface';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  // =====================================================================================
  // Metodo para inicializar google SingIn
  // =====================================================================================
  async googleInit() {
    return await gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id:
          '942325677785-qa71097koocklj5jo8drv8nvtle61t25.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
    });
  }

  // =====================================================================================
  // Metodo para hacer logout o cerrar sesion
  // =====================================================================================
  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  // =====================================================================================
  // Metodo para validar token y reenviarlo
  // =====================================================================================
  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    // peticion al backeng
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: { 'x-token': token },
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token); // extrayendo el token de la respuesta y almacenandola en el localStorage
        }),
        map((resp) => true),
        catchError((error) => of(false))
      );
  }

  // =====================================================================================
  // Metodo para crear usuarios y obtenerlo del form
  // =====================================================================================
  crearUsuario(formData: RegisterForm) {
    // creando el url que lleva localhost:300/api/usuarios
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token); // extrayendo el token de la respuesta y almacenandola en el localStorage
      })
    );
  }

  // =====================================================================================
  // Metodo para hacer login
  // =====================================================================================
  login(formData: LoginForm) {
    // creando el url para acceder a la pagina
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token); // extrayendo el token de la respuesta y almacenandola en el localStorage
      })
    );
  }

  // =====================================================================================
  // Metodo para hacer login con Google
  // =====================================================================================
  loginGoogle(token) {
    // creando el url para acceder a la pagina
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token); // extrayendo el token de la respuesta y almacenandola en el localStorage
      })
    );
  }
}
