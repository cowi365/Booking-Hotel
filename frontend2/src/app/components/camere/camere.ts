// =============================================
// COMPONENTE CAMERE
// Carica le camere disponibili dall'API
// e le mostra in griglia.
// =============================================

import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CameraService } from '../../services/camera.service';
import { Camera } from '../../models/camera.model';

@Component({
  selector: 'app-camere',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './camere.html',
  styleUrl: './camere.css'
})
export class CamereComponent implements OnInit {

  // Array che conterrà le camere ricevute dall'API
  camere: Camera[] = [];

  // true mentre la richiesta HTTP è in corso
  caricamento = true;

  // Messaggio di errore se la chiamata fallisce
  errore = '';

  constructor(private cameraService: CameraService) {}

  // ngOnInit: eseguito da Angular subito dopo la creazione del componente
  ngOnInit(): void {
    setTimeout(() => {
     this.caricaCamere();
    }, 100);
  }

  caricaCamere(): void {
    this.caricamento = true;

    // subscribe() riceve i dati quando l'Observable li emette
    this.cameraService.getCamere().subscribe({
      next: (dati) => {
        // Filtra solo le camere con stato 'Disponibile'
        this.camere = dati;
        this.caricamento = false;
      },
      error: (err) => {
        this.errore = 'Impossibile caricare le camere. Assicurati che il backend sia avviato.';
        this.caricamento = false;
        console.error(err);
      }
    });
  }

  /** Restituisce un URL immagine in base alla tipologia della camera */
  getImmagine(tipologia: string): string {
    const immagini: Record<string, string> = {
      'Singola': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600',
      'Doppia':  'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600',
      'Suite':   'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600',
    };
    for (const [chiave, url] of Object.entries(immagini)) {
      if (tipologia?.includes(chiave)) return url;
    }
    return immagini['Doppia'];
  }
}