import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formSumitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.renderButton();
  }

  // =====================================================================================
  // Metodo para hacer login
  // =====================================================================================
  login() {
    // this.router.navigateByUrl('/');
    this.usuarioService.login(this.loginForm.value).subscribe(
      (resp) => {
        // guardando en el localStorage si el usuario acepta recordar usuario
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }

        // TODO: mover al dashboard
        this.router.navigateByUrl('/');
      },
      (err) => {
        // si sucede un error
        if (err.error.errors.email) {
          Swal.fire('Error', err.error.errors.email.msg, 'error');
        } else {
          Swal.fire('Error', err.error.errors.password.msg, 'error');
        }
      }
    );
  }

  // =====================================================================================
  // Metodo para hacer login mediante google
  // =====================================================================================
  renderButton(): any {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });

    this.startApp();
  }

  async startApp() {
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        // console.log(id_token);
        this.usuarioService.loginGoogle(id_token).subscribe((resp) => {
          // TODO: mover al dashboard
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          });
        });
      },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
  // =====================================================================================
  // Metodo para validar los campos del formulario
  // =====================================================================================
  campoNoValido(campo: string): boolean {
    if (this.loginForm.get(campo).invalid && this.formSumitted) {
      return true;
    } else {
      return false;
    }
  }
}
