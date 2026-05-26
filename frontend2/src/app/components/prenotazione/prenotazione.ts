// =============================================
// COMPONENTE PRENOTAZIONE
// Flusso al click "Conferma":
//   1. Validazione form lato client
//   2. POST /api/ospiti → crea ospite nel DB
//   3. GET /api/ospiti → recupera ID ospite per email
//   4. POST /api/prenotazioni → crea prenotazione
//   5. Naviga a /conferma con i dati
// =============================================

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CameraService } from '../../services/camera.service';
import { OspiteService } from '../../services/ospite.service';
import { Camera } from '../../models/camera.model';

@Component({
  selector: 'app-prenotazione',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './prenotazione.html',
  styleUrl: './prenotazione.css'
})
export class PrenotazioneComponent implements OnInit {

  cameraSelezionata: Camera | null = null;
  tutte_camere: Camera[] = [];

  // Oggetti legati al form con [(ngModel)]
  ospite = {
    Nome: '',
    Cognome: '',
    Email: '',
    Telefono: '',
    Documento_Identita: ''
  };

  prenotazione = {
    Data_CheckIn: '',
    Data_CheckOut: '',
    FK_ID_Camera: 0
  };

  invio = false;   // true durante la chiamata HTTP
  errore = '';
  oggi = new Date().toISOString().split('T')[0];

  constructor(
    private route: ActivatedRoute,   // legge parametri dall'URL
    private router: Router,          // naviga tra le pagine
    private cameraService: CameraService,
    private ospiteService: OspiteService
  ) {}

  ngOnInit(): void {
    // Carica tutte le camere per il menu a tendina
    this.cameraService.getCamere().subscribe({
      next: (camere) => {
        this.tutte_camere = camere.filter(c => c.Stato === 'Disponibile');
      }
    });

    // Legge il parametro :id dall'URL (es. /prenotazione/3)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.prenotazione.FK_ID_Camera = +id; // + converte stringa → numero
      this.cameraService.getCamera(+id).subscribe({
        next: (camera) => this.cameraSelezionata = camera
      });
    }
  }

  // =============================================
  // METODO PRINCIPALE - eseguito al click "Conferma"
  // =============================================
  confermaPrenotazione(): void {
    // 1. Validazione lato client
    if (!this.ospite.Nome || !this.ospite.Cognome || !this.ospite.Email) {
      this.errore = 'Compila almeno nome, cognome e email.';
      return;
    }
    if (!this.prenotazione.Data_CheckIn || !this.prenotazione.Data_CheckOut) {
      this.errore = 'Seleziona le date di check-in e check-out.';
      return;
    }
    if (!this.prenotazione.FK_ID_Camera) {
      this.errore = 'Seleziona una camera.';
      return;
    }

    this.invio = true;
    this.errore = '';

    // 2. POST /api/ospiti → Flask → INSERT INTO Ospiti
    this.ospiteService.creaOspite(this.ospite).subscribe({
      next: () => {
        // 3. GET /api/ospiti → trova ID per email
        this.ospiteService.getOspiti().subscribe({
          next: (ospiti) => {
            const ospiteTrovato = ospiti.find(o => o.Email === this.ospite.Email);
            if (!ospiteTrovato) {
              this.errore = 'Errore nel trovare l\'ospite appena creato.';
              this.invio = false;
              return;
            }

            // 4. POST /api/prenotazioni → Flask → INSERT INTO Prenotazioni
            const payload = {
              Data_CheckIn: this.prenotazione.Data_CheckIn,
              Data_CheckOut: this.prenotazione.Data_CheckOut,
              Stato_Prenotazione: 'Confermata',
              FK_ID_Ospite: ospiteTrovato.ID_Ospite,
              FK_ID_Camera: this.prenotazione.FK_ID_Camera,
              FK_ID_Canale: 1
            };

            this.ospiteService.creaPrenotazione(payload).subscribe({
              next: () => {
                // 5. Naviga alla pagina conferma passando i dati
                this.router.navigate(['/conferma'], {
                  state: {
                    ospite: ospiteTrovato,
                    checkin: this.prenotazione.Data_CheckIn,
                    checkout: this.prenotazione.Data_CheckOut,
                    camera: this.cameraSelezionata || this.prenotazione.FK_ID_Camera
                  }
                });
              },
              error: () => {
                this.errore = 'Errore nella creazione della prenotazione.';
                this.invio = false;
              }
            });
          }
        });
      },
      error: () => {
        this.errore = 'Errore nella registrazione ospite. Email già presente?';
        this.invio = false;
      }
    });
  }
}
