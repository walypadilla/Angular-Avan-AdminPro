import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formSumitted = false;

  public registerForm = this.fb.group(
    {
      nombre: ['walter', [Validators.required, Validators.minLength(3)]],
      apellido: ['padilla', [Validators.required, Validators.minLength(3)]],
      email: ['tests100@gmail.com', [Validators.required, Validators.email]],
      password: ['1234', Validators.required],
      password2: ['1234', Validators.required],
      terminos: [true, Validators.required],
    },
    { validators: this.passwordsIguales('password', 'password2') }
  );

  constructor(
    public fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  // =====================================================================================
  // Metodo para crear usuarios
  // =====================================================================================
  crearUsuario(): any {
    this.formSumitted = true;
    // validando formulario
    if (this.registerForm.invalid) {
      return;
    }

    // realizar la creacion
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
      (resp) => {
        this.router.navigateByUrl('/');
      },
      (err) => {
        // si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  // =====================================================================================
  // Metodo para validar los campos del formulario
  // =====================================================================================
  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSumitted) {
      return true;
    } else {
      return false;
    }
  }

  // =====================================================================================
  // Metodo para validar que las contraseñas sean iguales
  // =====================================================================================
  contrasenasNoValidas(): boolean {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    // validando que las contraseñas no vengan vacias
    if (pass1 === '' && pass2 === '' && this.formSumitted) {
      return true;
    }
    if (pass1 !== pass2 && this.formSumitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos(): boolean {
    return !this.registerForm.get('terminos').value && this.formSumitted;
  }

  // =====================================================================================
  // Metodo personalizado para manejar las contraseñas en el Form
  // =====================================================================================
  passwordsIguales(pass1Name: string, pass2Name: string): any {
    // retornamos una funcion de flecha
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }
}
