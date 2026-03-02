# EduMind AI - Guida Tecnica e Funzionale

Benvenuto in **EduMind AI**, il tutor intelligente per il biennio ITIS progettato per rendere l'apprendimento interattivo, accessibile e visivamente rilassante.

## 🌟 Novità Aggiornamento Recente

### 1. Nuova Interfaccia "Warm Sunlight"
L'app è stata completamente ridisegnata con una palette di colori caldi ottimizzata per sessioni di studio prolungate:
- **Base Cromatica**: Crema caldo (`#fdfaf6`) e Marrone caffè (`#451a03`) per un contrasto elevato ma non affaticante.
- **Accenti**: Arancio terracotta e Ambra per evidenziare le azioni principali e le statistiche.
- **Effetto Glassmorphism**: Tutte le componenti (card, chat, pannelli) utilizzano un effetto "vetro satinato" che dona profondità e modernità all'interfaccia.

### 2. Funzionalità Vocale Avanzata (Ottimizzata per Mac)
È stata introdotta una funzione di dettatura in tempo reale nella chat:
- **Tecnologia**: Utilizza la *Web Speech API* configurata per dare priorità all'hardware locale del Mac.
- **Niente Conflitti**: Impedisce a macOS di attivare automaticamente l'iPhone (Continuity Mic), garantendo una trascrizione immediata e fluida senza interruzioni audio di sistema.
- **Feedback Real-time**: L'utente riceve feedback visivo sullo stato del microfono (In ascolto, Ricerca microfono, ecc.) direttamente sopra la barra di input.

## 🚀 Funzionalità Principali

### 👨‍🎓 Per lo Studente
- **Dashboard Personalizzata**: Visualizzazione immediata di XP (Crediti), Streak giornalieri e avatar dinamici.
- **Stanze Materia**: Accesso a materiali specifici caricati dai docenti.
- **Sessione Studio AI**: Chat interattiva basata sui documenti caricati. Supporta domande testuali e vocali.
- **Stili di Apprendimento**: Test integrato per adattare il linguaggio dell'AI al proprio metodo di studio (Visivo, Uditivo, ecc.).
- **Sistema XP & Badge**: Gamification per incentivare la costanza e la qualità delle domande.

### 👨‍🏫 Per il Docente
- **Pannello di Controllo**: Upload semplificato di materiali didattici (PDF, DOCX, PPTX).
- **Processing Pipeline**: Sistema automatico di analisi e indicizzazione dei documenti per il supporto AI.
- **Monitoraggio**: Gestione dei documenti caricati e analisi dei progressi della classe.

## 🛠 Note Tecniche

### Requisiti di Sistema
- **Browser**: Chrome, Safari o Edge (versioni aggiornate).
- **Microfono**: Necessario per la funzione vocale. Su Mac, assicurati di concedere il permesso al browser.

### Sviluppo
Il frontend è basato su **React 19**, **Vite** e **Tailwind CSS**. 
Lo stile è gestito tramite variabili CSS nel file `src/style.css` per una facile personalizzazione dei temi.

---
*Progetto Didattico · Made with 🧡 for Students*
