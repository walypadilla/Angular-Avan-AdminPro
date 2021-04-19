import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  public onSubmmited = false;
  public perfilForm: FormGroup;
  public usuario: User;
  public imagenUp: File;
  public imgTemp: any = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      apellido: [this.usuario.apellido, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  // =================================================================================
  // UPDATE PROFILE
  // =================================================================================
  updateProfile() {
    this.usuarioService.updateUsuario(this.perfilForm.value).subscribe(
      (resp) => {
        const { nombre, apellido, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.apellido = apellido;
        this.usuario.email = email;
        Swal.fire('Updates', 'User updated successfully', 'success');
      },
      (err) => {
        if (err.error.msg) {
          Swal.fire('Error', err.error.msg, 'error');
        } else if (err.error.errors.email) {
          Swal.fire('Error', err.error.errors.email.msg, 'error');
        }
      }
    );
  }

  // =================================================================================
  // UPDATE IMAGE
  // =================================================================================
  changeImage(file: File) {
    this.imagenUp = file;

    if (!file) {
      return (this.imgTemp = null);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  // =================================================================================
  // UPLOAD IMAGE
  // =================================================================================
  uploadImage() {
    this.fileUploadService
      .updatePhoto(this.imagenUp, 'usuarios', this.usuario.uid)
      .then((img) => {
        this.usuario.img = img;
        Swal.fire('Updates', 'Image updated successfully', 'success');
      })
      .catch((err) => {
        Swal.fire('Error', 'Could not save image', 'error');
      });
  }
}
