// =============================================
// CONFIGURAZIONE DELL'APPLICAZIONE
// provideRouter: attiva il routing
// provideHttpClient: abilita HttpClient
//   nei Servizi per le chiamate HTTP
// =============================================

import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch())  // necessario per HttpClient nei Servizi
  ]
};
