// =============================================
// COMPONENTE CONFERMA
// Mostra il riepilogo dopo una prenotazione
// andata a buon fine. Legge i dati passati
// dal componente Prenotazione tramite
// router.navigate(..., { state: {...} }).
// =============================================

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-conferma',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './conferma.html',
  styleUrl: './conferma.css'
})
export class ConfermaComponent implements OnInit {

  ospite: any = null;
  checkin = '';
  checkout = '';
  camera: any = null;

  constructor(private router: Router) {
    // getCurrentNavigation() deve essere nel costruttore
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state;
    if (state) {
      this.ospite   = state['ospite'];
      this.checkin  = state['checkin'];
      this.checkout = state['checkout'];
      this.camera   = state['camera'];
    }
  }

  ngOnInit(): void {
    // Se si accede direttamente all'URL senza dati, torna alla home
    if (!this.ospite) {
      this.router.navigate(['/']);
    }
  }

  /** Converte 'YYYY-MM-DD' in formato italiano leggibile */
  formattaData(data: string): string {
    if (!data) return '';
    return new Date(data + 'T12:00:00').toLocaleDateString('it-IT', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }
}
