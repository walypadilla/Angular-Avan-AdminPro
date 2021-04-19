import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login.interface';
import { UpdateUserForm } from '../interfaces/update-user.interface';

import { User } from '../models/user.model';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2: any;
  public usuario: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }
  // =====================================================================================
  // Get para obtener datos
  // =====================================================================================
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }
  // =====================================================================================
  // Metodo para inicializar google SingIn
  // =====================================================================================
  googleInit() {
    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id:
            '942325677785-qa71097koocklj5jo8drv8nvtle61t25.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve(this.auth2);
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
    // peticion al backeng
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: { 'x-token': this.token },
      })
      .pipe(
        map((resp: any) => {
          // destructuracion del objeto usuario
          const {
            apellido,
            email,
            estado,
            google,
            id,
            img = '',
            nombre,
            role,
          } = resp.usuario;

          // crando instancia del objeto usuario
          this.usuario = new User(
            nombre,
            apellido,
            email,
            '',
            img,
            google,
            role,
            estado,
            id
          );
          localStorage.setItem('token', resp.token); // extrayendo el token de la respuesta y almacenandola en el localStorage
          return true;
        }),
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
  // Metodo actualizar usuario
  // =====================================================================================
  updateUsuario(data: UpdateUserForm) {
    data = {
      ...data,
      role: this.usuario.role,
    };
    // creando el url que lleva localhost:300/api/usuarios
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: { 'x-token': this.token },
    });
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
