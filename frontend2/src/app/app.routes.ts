// =============================================
// ROTTE DELL'APPLICAZIONE
// Ogni rotta mappa un URL a un Componente.
// loadComponent = lazy loading: il file JS del
// componente viene scaricato solo quando serve.
// =============================================

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then(m => m.HomeComponent),
    title: 'Hotel Aurora — Home'
  },
  {
    path: 'camere',
    loadComponent: () => import('./components/camere/camere').then(m => m.CamereComponent),
    title: 'Hotel Aurora — Camere'
  },
  {
    path: 'prenotazione',
    loadComponent: () => import('./components/prenotazione/prenotazione').then(m => m.PrenotazioneComponent),
    title: 'Hotel Aurora — Prenota'
  },
  {
    // :id = parametro dinamico letto con ActivatedRoute nel componente
    path: 'prenotazione/:id',
    loadComponent: () => import('./components/prenotazione/prenotazione').then(m => m.PrenotazioneComponent),
    title: 'Hotel Aurora — Prenota Camera'
  },
  {
    path: 'conferma',
    loadComponent: () => import('./components/conferma/conferma').then(m => m.ConfermaComponent),
    title: 'Hotel Aurora — Conferma'
  },
  {
    // Wildcard: qualsiasi URL non riconosciuto torna alla home
    path: '**',
    redirectTo: ''
  }
];
