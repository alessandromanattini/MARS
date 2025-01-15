# Mars AUI - README

Benvenuti nel progetto **Mars AUI**, un prototipo di gioco educativo basato su interazioni vocali e test di riconoscimento.  
Di seguito troverai una panoramica dell’architettura dei file e le istruzioni su cosa scaricare/avviare per far funzionare correttamente l’applicazione.

---

## Introduzione

Per poter utilizzare e testare questa applicazione, hai bisogno di:

1. **Clonare o scaricare l’intero repository** (o l’insieme di cartelle) contenente:
   - I file HTML, CSS e JavaScript (compresi `STT.js`, `events.js`, `gameLogic.js`, `data.js`, `state.js`, ecc.).
   - I file Python (se vuoi far girare la parte server con Flask).
   - Le cartelle multimediali (`Graphic/`, `Audio/`) con immagini, video e audio.

2. **Installare le librerie necessarie** (se usi la parte server Python/Flask):
   - `Flask`
   - `SQLAlchemy`
   - `flask-cors`
   - `requests` (se necessario)
   - `numpy`, `librosa`, `soundfile` (per il filtraggio audio con `wiener_filter.py`, se previsto)  
   Puoi installarle tutte con:
   ```bash
   pip install Flask SQLAlchemy flask-cors requests numpy librosa soundfile
3. **Avviare un server locale** (ad esempio tramite app.py con Flask o un server statico) che ospiti la cartella del progetto :
   - `python3 app.py`
     
4. **Testare le funzionalità** visitando la pagina index.html nel browser (e, se necessario, interfacciarsi al server Flask su http://127.0.0.1:5500).

## Struttura dei File

### File Principali

#### `index.html`
- File principale che contiene la struttura del gioco.
- Include riferimenti a:
  - `style.css` per la grafica.
  - `main.js` e altri script per la logica.

#### `style.css`
- Gestisce lo stile e l'aspetto dell'interfaccia.

#### `main.js`
- Punto di ingresso per lo script. Coordina le funzionalità principali e include riferimenti agli altri file JavaScript.

---

### Moduli JavaScript

#### `events.js`
- Gestisce gli eventi dell’interfaccia utente, come click e caricamento della pagina.

#### `data.js`
- Contiene costanti, array di dati (come frasi e riferimenti agli elementi HTML) e configurazioni globali.

#### `gameLogic.js`
- Contiene la logica principale del gioco, tra cui:
  - Cambio schermata.
  - Gestione dello stato dell'esercizio.
  - Funzioni per il salvataggio e l’upload dei dati.

#### `state.js`
- Gestisce lo stato globale del gioco con funzioni di lettura e aggiornamento.

#### `STT.js`
- Implementa il riconoscimento vocale tramite la Web Speech API.
- Esegue confronti tra le frasi pronunciate e quelle attese.

---

### File Server-Side

#### `app.py`
- Implementazione di un server Flask per la gestione dei dati e l'interfaccia con il database.

#### `wiener_filter.py`
- Script Python per migliorare la qualità dei file audio usando il filtro di Wiener.

#### `processing_audio.py`
- Modulo per l'elaborazione dell'audio.

---

### Risorse Multimediali

#### `Graphic/`
- Contiene immagini, sprite e altre risorse grafiche.

#### `Audio/`
- Contiene file audio e video utilizzati nel gioco.

---

## Esecuzione

1. **Avviare il server Flask** 
2. **Aprire** in un browser compatibile : Microsoft Edge
3. **Navigare e testare le funzionalità del gioco**
