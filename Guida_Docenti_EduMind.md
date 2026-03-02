# Guida Docenti — EduMind

Questa guida spiega passo‑passo come utilizzare EduMind dal punto di vista docente, nella versione demo attuale.

## 1. Accesso all’applicazione

1. Apri l’app nel browser: http://localhost:5173/
2. Dal menu in alto, seleziona **Docenti** per accedere al pannello insegnante.

## 2. Pannello Insegnante

Nel pannello docente puoi:
- Caricare materiali didattici
- Selezionare la materia di riferimento
- Descrivere il contenuto del documento
- Visualizzare la pipeline di processing prevista

### 2.1 Selezione materia

1. Apri il menu a tendina **Materia**.
2. Scegli la materia per cui stai caricando il materiale (es. Diritto, Matematica, Fisica).

### 2.2 Inserimento titolo e descrizione

1. Compila il campo **Titolo documento** con un nome chiaro.
2. Inserisci una **Descrizione** sintetica per aiutare gli studenti a capire il contenuto.

### 2.3 Caricamento file

1. Trascina il file nell’area tratteggiata oppure clicca su **Seleziona file**.
2. Formati supportati previsti: PDF, DOCX, TXT, PPTX, immagini (OCR).

## 3. Pipeline di Processing

Dopo il caricamento, il sistema segue questo flusso:
1. Validazione formato e dimensione
2. Estrazione del testo
3. Chunking intelligente per AI
4. Indicizzazione e pubblicazione del documento

Questa sezione ti aiuta a capire come i documenti vengono trasformati in contenuti interrogabili dagli studenti.

## 4. Verifica dei contenuti lato studente

Per controllare come gli studenti vedranno il documento:
1. Vai in **Dashboard**.
2. Apri una **Materia**.
3. Seleziona il documento dalla **Stanza Materia**.
4. Avvia una **Sessione di Studio** e fai una domanda di prova.

## 5. Fase di Verifica (Quiz)

La sezione **Verifica** descrive:
- Tipologie di domande previste
- Flusso di verifica con quiz senza supporto AI
- Feedback automatico ai risultati

## 6. Suggerimenti didattici

- Carica documenti brevi e focalizzati per facilitare il chunking.
- Usa titoli e descrizioni leggibili dagli studenti.
- Verifica il contenuto con una o due domande di prova prima di assegnarlo.

## 7. Note sulla versione demo

Questa versione mostra il flusso completo a livello UI, ma non include ancora:
- Integrazione reale con API AI
- Parsing effettivo di PDF/DOCX
- Persistenza su database

Quando queste funzionalità saranno attivate, la guida sarà aggiornata con i passaggi tecnici reali.
