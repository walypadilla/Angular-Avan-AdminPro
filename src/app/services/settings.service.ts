import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');

  constructor() {
    const url =
      localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';

    this.linkTheme.setAttribute('href', url);
  }

  // metodo para cambiar tema
  changeTheme(theme: string) {
    // seleccion del documento
    const url = `./assets/css/colors/${theme}.css`;

    // cambiando valores
    this.linkTheme.setAttribute('href', url);

    // guardando la preferencia en el localStorage
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }

  // metodo para aplicar el check
  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');

    links.forEach((element) => {
      // removiendo la clase por si ya existe
      element.classList.remove('working');
      // accediendo a los elementos que contengan el data-theme
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currenTheme = this.linkTheme.getAttribute('href');

      // comparando si son iguales se agrega la clase
      if (btnThemeUrl === currenTheme) {
        element.classList.add('working');
      }
    });
  }
}
