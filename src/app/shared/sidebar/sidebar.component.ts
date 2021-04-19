import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SidebarService } from '../../services/sidebar.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public usuario: User;

  constructor(
    private sidebarService: SidebarService,
    private usuarioService: UsuarioService
  ) {
    this.menuItems = sidebarService.menu;
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {}
}
