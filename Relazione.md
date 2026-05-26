1.Architettura del Sistema
Il progetto Hotel Aurora è un'applicazione web fullstack composta da tre livelli distinti che
comunicano tra loro per permettere all'utente di prenotare una camera d'albergo online.

1.1 Schema Architetturale
L'architettura segue il modello a tre livelli (Three-Tier Architecture):
• Database Layer — MySQL su TiDB Cloud: contiene tutti i dati persistenti dell'hotel
• Backend Layer — Python Flask: espone le API REST e gestisce la logica di business
• Frontend Layer — Angular: interfaccia utente che l'ospite vede nel browser

1.2 Flusso dei Dati
Quando un utente effettua una prenotazione, il flusso attraversa tutti e tre i livelli:
• L'utente compila il form nel browser (Angular)
• Angular invia una richiesta HTTP POST al backend Flask
• Flask riceve i dati, li valida e esegue le query SQL sul database MySQL
• MySQL salva i dati e conferma l'operazione a Flask
• Flask restituisce una risposta JSON ad Angular
• Angular mostra la pagina di conferma all'utente

1.3 Componenti Frontend Angular
Il frontend è organizzato in tre categorie di file:

Hotel Aurora — Relazione Tecnica | Progetto Fullstack

Anno Scolastico 2025/2026Pagina
• Models (camera.model.ts): interfacce TypeScript che definiscono la struttura dei dati
attesi dal backend. Non contengono logica, servono solo a garantire la correttezza
dei dati durante lo sviluppo.
• Services (camera.service.ts, ospite.service.ts): classi singleton iniettate tramite
Dependency Injection. Gestiscono tutte le chiamate HTTP al backend usando
HttpClient. Restituiscono Observable, valori asincroni a cui i componenti si iscrivono
con subscribe().
• Components (home, camere, prenotazione, conferma, navbar): gestiscono la
visualizzazione e l'interazione con l'utente. Ogni componente ha un file TypeScript
per la logica, un file HTML per il template e un file CSS per gli stili.
2.2 Relazioni principali
• Camera (N) — appartiene a — (1) Tipologie_Camera
• Prenotazione (N) — riguarda — (1) Ospite
• Prenotazione (N) — occupa — (1) Camera
• Prenotazione (N) — arriva tramite — (1) Canale_Prenotazione
• Prenotazione (1) — ha — (N) Pagamenti
• Prenotazione (1) — ha — (N) Recensioni
• Prenotazione (N:N) — include — (N) Servizi_Extra [tramite Servizi_Prenotati]
• Registro_Pulizie (N) — riguarda — (1) Camera
• Registro_Pulizie (N) — eseguita da — (1) Staff_Dipendenti
• Tariffe_Stagionali (N) — applicate a — (1) Tipologie_Camera
4.2 Gestione Branch e Collaborazione
Il repository GitHub è ospitato all'indirizzo: https://github.com/Smailia/Booking-Hotel
• Branch main: branch principale con il codice stabile e integrato
• Branch Branch-Smailia: sviluppo del frontend Angular (componenti, servizi, routing,
CSS)
• Branch branch_russo: sviluppo del backend Flask (API, database, query SQL)

4.3 Fasi del Progetto
• Fase 1 — Analisi e DB Design: progettazione dello schema ER con 12 entità,
definizione delle relazioni e creazione delle tabelle MySQL su TiDB Cloud
• Fase 2 — Setup e API Design: configurazione dell'ambiente di sviluppo su GitHub
Codespaces, definizione degli endpoint REST e struttura delle risposte JSON
• Fase 3 — Backend Development: implementazione di tutti gli endpoint Flask con
query SQL, gestione degli errori e configurazione CORS
• Fase 4 — Frontend Development: sviluppo dell'interfaccia Angular con tema hotel di
lusso, integrazione con le API Flask e gestione del flusso di prenotazione
• Fase 5 — Documentazione: commenti al codice, README, relazione tecnica e
preparazione alla presentazione

Hotel Aurora — Relazione Tecnica | Progetto Fullstack

Anno Scolastico 2025/2026Pagina
4.4 Scelte Tecniche Principali
• Flask serve il frontend Angular in produzione: il build di Angular viene copiato nella
cartella static di Flask, eliminando i problemi di CORS tra porte diverse
• Lazy Loading in Angular: ogni pagina viene caricata solo quando l'utente la visita,
migliorando le performance iniziali
• DELETE a cascata nel backend: prima di eliminare un record padre (es. Camera),
Flask elimina tutti i record figli collegati per rispettare i vincoli di chiave esterna
• Observable pattern: le chiamate HTTP usano Observable di RxJS invece di Promise,
permettendo una gestione più flessibile degli errori