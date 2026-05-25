// =============================================
// COMPONENTE HOME
// Pagina di atterraggio. Solo presentativa,
// non effettua chiamate HTTP.
// =============================================

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

  // Array di oggetti per le card dei servizi
  // Iterato nel template con @for
  servizi = [
    { icona: '🍽️', titolo: 'Ristorante Gourmet', desc: 'Cucina italiana d\'eccellenza con ingredienti locali' },
    { icona: '🧖', titolo: 'Spa & Benessere',     desc: 'Trattamenti esclusivi per corpo e mente' },
    { icona: '🏊', titolo: 'Piscina Panoramica',  desc: 'Vista mozzafiato sulle colline toscane' },
    { icona: '🚗', titolo: 'Navetta Privata',      desc: 'Trasferimenti da e per l\'aeroporto' },
  ];
}
