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
}
