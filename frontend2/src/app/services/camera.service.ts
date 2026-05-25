// =============================================
// SERVIZIO CAMERE
// I Servizi in Angular sono classi singleton
// (una sola istanza nell'app) che gestiscono
// la logica di business e le chiamate HTTP.
// @Injectable permette di iniettarli nei
// componenti tramite Dependency Injection.
// =============================================

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camera } from '../models/camera.model';

@Injectable({
  providedIn: 'root'  // disponibile globalmente nell'app
})
export class CameraService {

  // URL base del backend Flask
  private apiUrl = '/api';  
  
  // HttpClient viene iniettato automaticamente da Angular
  constructor(private http: HttpClient) {}

  /** Recupera tutte le camere (GET /api/camere) */
  getCamere(): Observable<Camera[]> {
    // Observable: valore asincrono a cui ci si "iscrive" con subscribe()
    return this.http.get<Camera[]>(`${this.apiUrl}/camere`);
  }

  /** Recupera una singola camera per ID (GET /api/camere/:id) */
  getCamera(id: number): Observable<Camera> {
    return this.http.get<Camera>(`${this.apiUrl}/camere/${id}`);
  }
}
