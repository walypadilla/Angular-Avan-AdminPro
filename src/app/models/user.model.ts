import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

export class User {
  constructor(
    public nombre: string,
    public apellido: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public estado?: boolean,
    public uid?: string
  ) {}

  // ==========================================================================
  // Metodo para obtener la imagen
  // ==========================================================================
  get imagenUrl(): string {
    // /upload/usuarios/9fd4d371-f332-4b0f-94d8-8f55066ca904.jpg
    if (this.img.includes('https')) {
      return this.img;
    }

    if (this.img) {
      return `${base_url}//upload/usuarios/${this.img}`;
    } else {
      return `${base_url}//upload/usuarios/no-image`;
    }
  }
}
