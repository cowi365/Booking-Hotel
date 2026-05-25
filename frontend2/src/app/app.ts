// =============================================
// COMPONENTE RADICE (ROOT)
// Primo componente caricato dall'app.
// Contiene la Navbar (sempre visibile) e
// <router-outlet> dove Angular inserisce
// il componente della rotta corrente.
// =============================================

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <!-- Navbar sempre visibile in cima alla pagina -->
    <app-navbar></app-navbar>

    <!-- router-outlet = segnaposto: Angular inserisce qui
         il componente corrispondente alla rotta attiva -->
    <router-outlet></router-outlet>
  `
})
export class App {}
