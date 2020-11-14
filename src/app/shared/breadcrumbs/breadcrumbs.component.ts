import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy {
  public titulo: string;
  public tituloSub$: Subscription;

  constructor(private router: Router) {
    this.getSubscriptionData();
  }
  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe();
  }

  // metodo para obtener data de la ruta en la que se encuentra
  getDataRuta() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd), // llamando solo los ActivationEnd
      filter((event: ActivationEnd) => event.snapshot.firstChild === null), // llamando los ActivationEnd que contienen la data
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }

  // metodo que sirve para obtener la data
  getSubscriptionData() {
    this.tituloSub$ = this.getDataRuta().subscribe(({ titulo }) => {
      this.titulo = titulo;
      document.title = `AdminPro - ${titulo}`;
    });
  }
}
