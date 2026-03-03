# Guida all'Accesso Remoto per l'Applicazione EduMind (con Ollama Locale)

Comprendere come rendere l'applicazione EduMind accessibile da un altro computer, come il PC Windows di tua sorella, è fondamentale. La buona notizia è che è **assolutamente possibile**, ma richiede alcune configurazioni di rete e del tuo sistema macOS. 

Questa guida ti illustrerà i passaggi necessari per condividere l'applicazione EduMind (con Ollama in esecuzione sul tuo Mac) con altri dispositivi nella stessa rete locale (LAN).

## 1. Architettura di Rete del Progetto

Per capire le modifiche necessarie, è utile visualizzare come l'applicazione funziona:

*   **Frontend (Vite):** L'interfaccia utente che tua sorella vedrà nel browser. Gira sul tuo Mac, tipicamente sulla porta `5173`.
*   **Backend API (Node.js):** Il server che gestisce la logica dell'applicazione, inclusa la comunicazione con Ollama. Gira sul tuo Mac, probabilmente su una porta come `3000` o `8080`.
*   **Ollama Server:** Il motore LLM locale che genera le risposte. Gira sul tuo Mac, sulla porta `11434`.

Affinché tua sorella possa usare l'app, sia il frontend che il backend (e di conseguenza Ollama) devono essere accessibili dal suo PC Windows.

## 2. Configurazione di Ollama per l'Accesso in Rete

Per impostazione predefinita, Ollama si lega all'indirizzo `127.0.0.1` (localhost), rendendolo accessibile solo dal tuo Mac. Per consentire l'accesso da altri dispositivi nella tua rete, devi configurare la variabile d'ambiente `OLLAMA_HOST` [1].

1.  **Apri il Terminale** sul tuo Mac.
2.  **Imposta la variabile d'ambiente:**
    ```bash
    launchctl setenv OLLAMA_HOST 
"0.0.0.0"
    launchctl setenv OLLAMA_ORIGINS "*"
    ```
    Questi comandi configurano Ollama per ascoltare su tutte le interfacce di rete e consentire richieste da qualsiasi origine. Dopo aver eseguito questi comandi, **riavvia Ollama** (dall'icona nella barra dei menu o riavviando il Mac) per applicare le modifiche.

## 3. Configurazione del Backend (Node.js API)

Il tuo server Node.js API (che comunica con Ollama) deve essere configurato per ascoltare su tutte le interfacce di rete e non solo su `localhost`.

1.  **Trova il file di avvio del server:** Nel tuo progetto, cerca il file che avvia il server Node.js (probabilmente `Progetto-didattico-main/api/index.js` o simile).
2.  **Modifica l'indirizzo di ascolto:** Cerca la riga dove il server si mette in ascolto (es. `app.listen(port, () => { ... })`). Potrebbe essere necessario specificare l'host come `0.0.0.0`.
    ```javascript
    // Esempio: in api/index.js
    const port = process.env.PORT || 3000;
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server API in ascolto su http://0.0.0.0:${port}`);
    });
    ```
    Assicurati che il tuo codice utilizzi l'indirizzo IP del tuo Mac per connettersi a Ollama, non `localhost`. Se hai seguito la guida precedente, la funzione `callOllama` usa già `http://localhost:11434`, che è corretto se Ollama è configurato per ascoltare su `0.0.0.0`.

## 4. Configurazione del Frontend (Vite)

Anche il server di sviluppo di Vite deve essere configurato per essere accessibile da altri dispositivi.

1.  **Modifica `package.json`:** Nella directory principale del tuo progetto (`Progetto-didattico-main`), apri il file `package.json`.
2.  **Aggiungi `--host` allo script `dev`:** Modifica lo script `dev` per includere l'opzione `--host` [2].
    ```json
    {
      "name": "progetto-didattico",
      "private": true,
      "version": "0.0.0",
      "type": "module",
      "scripts": {
        "dev": "vite --host", // Aggiungi --host qui
        "build": "vite build",
        "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
        "preview": "vite preview"
      },
      // ... altre dipendenze
    }
    ```
    Questo farà sì che Vite ascolti su tutte le interfacce di rete disponibili.

## 5. Configurazione del Firewall su macOS

Il firewall del tuo Mac potrebbe bloccare le connessioni in entrata. Dovrai consentire le connessioni per le porte utilizzate dall'applicazione (es. `5173` per Vite, `3000` per il backend API e `11434` per Ollama).

1.  **Apri Preferenze di Sistema** > **Sicurezza e Privacy** > **Firewall**.
2.  **Sblocca** le impostazioni (potrebbe essere richiesta la password di amministratore).
3.  **Opzioni Firewall...** > **Aggiungi (+)** e cerca le applicazioni che avviano i tuoi server (es. `node` per il backend, `vite` o il tuo terminale se lo avvii da lì). Assicurati che abbiano "Consenti connessioni in entrata" [3].
4.  In alternativa, puoi disattivare temporaneamente il firewall per i test, ma **non è raccomandato per un uso prolungato**.

## 6. Accesso dal PC Windows di Tua Sorella

Una volta configurato tutto sul tuo Mac:

1.  **Trova l'indirizzo IP del tuo Mac:** Sul tuo Mac, vai in **Preferenze di Sistema** > **Rete** e annota l'indirizzo IP (es. `192.168.1.100`).
2.  **Apri il browser sul PC Windows:** Tua sorella dovrà aprire il suo browser e digitare l'indirizzo IP del tuo Mac seguito dalla porta del frontend di Vite.
    *   **Esempio:** Se l'IP del tuo Mac è `192.168.1.100` e Vite è sulla porta `5173`, l'indirizzo sarà `http://192.168.1.100:5173`.

## 7. Problemi Comuni e Soluzioni

| Problema Potenziale | Causa | Soluzione |
| :--- | :--- | :--- |
| **"Sito non raggiungibile"** | Firewall blocca la connessione, server non in ascolto su `0.0.0.0`, indirizzo IP errato. | Controlla le impostazioni del firewall, verifica le configurazioni di `OLLAMA_HOST`, `--host` per Vite e l'indirizzo di ascolto del backend. Assicurati che l'IP del Mac sia corretto. |
| **Errore CORS** | Il browser blocca richieste da origini diverse. | Assicurati che il tuo backend Node.js abbia configurato correttamente i [CORS (Cross-Origin Resource Sharing)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) per consentire richieste dall'indirizzo IP del PC Windows di tua sorella o da `*` (per tutti, ma meno sicuro). |
| **Ollama non risponde** | Ollama non è in esecuzione o non è configurato per l'accesso in rete. | Verifica che Ollama sia avviato e che `OLLAMA_HOST` sia impostato su `0.0.0.0` (e Ollama riavviato). |

## 8. Considerazioni sulla Sicurezza (Accesso via Internet)

Se volessi rendere l'applicazione accessibile via internet (non solo in LAN), la configurazione sarebbe più complessa e comporterebbe rischi di sicurezza significativi. Richiederebbe:

*   **Port Forwarding:** Configurare il router per inoltrare le porte al tuo Mac.
*   **IP Pubblico Statico o DDNS:** Il tuo indirizzo IP pubblico potrebbe cambiare, rendendo difficile l'accesso.
*   **Sicurezza:** Esporre servizi direttamente a internet senza adeguate misure di sicurezza (HTTPS, autenticazione robusta) è **altamente sconsigliato** e ti esporrebbe a potenziali attacchi.

Per un progetto didattico e un uso limitato a tua sorella, l'accesso in rete locale è la soluzione più semplice e sicura.

## Riferimenti

[1] Ollama. (n.d.). *FAQ - Ollama's documentation*. [https://docs.ollama.com/faq](https://docs.ollama.com/faq)
[2] Vite. (n.d.). *Server Options*. [https://vitejs.dev/config/server-options.html](https://vitejs.dev/config/server-options.html)
[3] Super User. (2014, January 13). *Opening port on mac os x (mavericks) for nodejs - firewall*. [https://superuser.com/questions/701066/opening-port-on-mac-os-x-mavericks-for-nodejs](https://superuser.com/questions/701066/opening-port-on-mac-os-x-mavericks-for-nodejs)
[4] Mozilla. (n.d.). *Cross-Origin Resource Sharing (CORS)*. [https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
