import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Main',
          url: '/',
        },
        {
          titulo: 'ProgressBar',
          url: 'progress',
        },
        {
          titulo: 'Gráficas',
          url: 'chart1',
        },
        {
          titulo: 'Promesas',
          url: 'promises',
        },
        {
          titulo: 'Rxjs',
          url: 'rxjs',
        },
      ],
    },
  ];
  constructor() {}
}
