import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('valor') progreso = 50;
  @Input() btnClass = 'btn-primary';

  // tslint:disable-next-line:no-output-rename
  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  // metodo que recibe el numero que se cambiara en el progress bar
  cambiarValor(valor: number): number {
    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return (this.progreso = 100);
    }

    if (this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return (this.progreso = 0);
    }

    this.progreso += valor;
    this.valorSalida.emit(this.progreso);
  }

  // metodo que recibira el numero que se escribira en el input
  onChance(nuevoValor: number) {
    // validando que el numero no sea mayor a 100 o menor a 0
    if (nuevoValor >= 100) {
      this.progreso = 100;
    } else if (nuevoValor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
    this.valorSalida.emit(this.progreso);
  }
}
