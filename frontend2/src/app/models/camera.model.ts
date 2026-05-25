// =============================================
// MODELLI DATI - Interfacce TypeScript
// Ogni interfaccia rispecchia la struttura
// delle tabelle nel database MySQL.
// =============================================

/** Rappresenta una camera con i dati della sua tipologia (JOIN SQL) */
export interface Camera {
  ID_Camera: number;
  Numero_Stanza: number;
  Piano: number;
  Stato: string;               // 'Disponibile' | 'Occupata' | 'In Manutenzione'
  FK_ID_Tipologia: number;
  nome_tipologia: string;      // campo dalla JOIN con Tipologie_Camera
  Posti_Letto: number;
  Descrizione: string;
}

/** Rappresenta un ospite registrato */
export interface Ospite {
  ID_Ospite: number;
  Nome: string;
  Cognome: string;
  Email: string;
  Telefono: string;
  Documento_Identita: string;
}

/** Payload inviato al backend per creare una prenotazione */
export interface NuovaPrenotazione {
  Data_CheckIn: string;        // formato ISO: 'YYYY-MM-DD'
  Data_CheckOut: string;
  Stato_Prenotazione: string;  // es. 'Confermata'
  FK_ID_Ospite: number;
  FK_ID_Camera: number;
  FK_ID_Canale: number;        // canale di prenotazione (es. sito web = 1)
}

/** Rappresenta una prenotazione con dati ospite e camera (JOIN SQL) */
export interface Prenotazione {
  ID_Prenotazione: number;
  Data_CheckIn: string;
  Data_CheckOut: string;
  Stato_Prenotazione: string;
  nome_ospite: string;
  cognome_ospite: string;
  Numero_Stanza: number;
}
