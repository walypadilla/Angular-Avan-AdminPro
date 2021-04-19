import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  public usuario: User;

  constructor(private usuarioService: UsuarioService) {
    this.usuario = usuarioService.usuario;
  }

  // ==========================================================================
  // metodo logout-- Invocando el metodo del servicio para hacer logout
  // ==========================================================================
  logout(): any {
    this.usuarioService.logout();
  }
}
