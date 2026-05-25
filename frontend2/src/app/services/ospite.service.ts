// =============================================
// SERVIZIO OSPITI E PRENOTAZIONI
// Gestisce le chiamate HTTP per creare ospiti
// e prenotazioni sul backend Flask.
// =============================================

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ospite, NuovaPrenotazione, Prenotazione } from '../models/camera.model';

@Injectable({
  providedIn: 'root'
})
export class OspiteService {

  private apiUrl = '/api';
  
  constructor(private http: HttpClient) {}

  /** Crea un nuovo ospite (POST /api/ospiti) */
  creaOspite(ospite: Omit<Ospite, 'ID_Ospite'>): Observable<{ messaggio: string }> {
    return this.http.post<{ messaggio: string }>(`${this.apiUrl}/ospiti`, ospite);
  }

  /** Recupera tutti gli ospiti (GET /api/ospiti) */
  getOspiti(): Observable<Ospite[]> {
    return this.http.get<Ospite[]>(`${this.apiUrl}/ospiti`);
  }

  /** Crea una nuova prenotazione (POST /api/prenotazioni) */
  creaPrenotazione(prenotazione: NuovaPrenotazione): Observable<{ messaggio: string }> {
    return this.http.post<{ messaggio: string }>(`${this.apiUrl}/prenotazioni`, prenotazione);
  }

  /** Recupera tutte le prenotazioni (GET /api/prenotazioni) */
  getPrenotazioni(): Observable<Prenotazione[]> {
    return this.http.get<Prenotazione[]>(`${this.apiUrl}/prenotazioni`);
  }
}
