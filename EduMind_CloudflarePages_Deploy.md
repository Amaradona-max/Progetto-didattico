# 🚀 EduMind — Deploy su Cloudflare Pages via GitHub
### Guida Completa per TRAE Editor

---

## 📌 Panoramica

**Cloudflare Pages** è la piattaforma di hosting statico/full-stack di Cloudflare, perfetta per EduMind perché offre:
- Deploy automatico ad ogni `git push`
- CDN globale ultra-veloce (ideale per studenti da tutta Italia)
- Free tier generoso (500 build/mese, banda illimitata)
- Preview URL automatici per ogni Pull Request
- Supporto per **Cloudflare Workers** (backend serverless integrato)

---

## 🏗️ Struttura Repository GitHub Consigliata

```
edumind/                          ← root repository
├── .github/
│   └── workflows/
│       └── deploy.yml            ← CI/CD GitHub Actions (opzionale)
├── frontend/                     ← App React/Vite
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── functions/                    ← Cloudflare Pages Functions (backend)
│   ├── api/
│   │   ├── ai.js                 ← Proxy Anthropic API
│   │   ├── documents/
│   │   │   └── upload.js
│   │   ├── auth/
│   │   │   ├── login.js
│   │   │   └── register.js
│   │   ├── credits.js
│   │   └── quizzes.js
│   └── _middleware.js            ← Auth middleware globale
├── .gitignore
├── .env.example
└── README.md
```

> **Nota TRAE:** `functions/` è la cartella speciale di Cloudflare Pages per le API serverless.
> Ogni file `.js` dentro `functions/api/` diventa automaticamente un endpoint REST.

---

## 📋 Step 1 — Preparare il Repository GitHub

### 1.1 Inizializza Git nel progetto

```bash
# Nella root del progetto EduMind
git init
git add .
git commit -m "feat: initial EduMind setup"
```

### 1.2 Crea il repository su GitHub

```bash
# Tramite GitHub CLI (consigliato)
gh repo create edumind --public --source=. --remote=origin --push

# Oppure manualmente su github.com, poi:
git remote add origin https://github.com/TUO-USERNAME/edumind.git
git branch -M main
git push -u origin main
```

### 1.3 File `.gitignore` essenziale

```gitignore
# Dipendenze
node_modules/
frontend/node_modules/

# Build
frontend/dist/
frontend/.vite/

# Variabili d'ambiente (MAI committare queste!)
.env
.env.local
.env.production

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Cloudflare
.wrangler/
```

### 1.4 File `.env.example` (da committare, senza valori reali)

```env
# Copia questo file in .env e compila con i valori reali
# NON committare mai il file .env

ANTHROPIC_API_KEY=sk-ant-...qui-la-tua-api-key...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_KEY=eyJhbGc...
JWT_SECRET=cambia-questo-con-una-stringa-random-lunga
```

---

## 📋 Step 2 — Configurare Vite per Cloudflare Pages

### 2.1 `frontend/vite.config.js`

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  build: {
    outDir: 'dist',
    // Importante per Cloudflare Pages
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
          charts: ['recharts'],
        },
      },
    },
  },
  
  // Proxy per sviluppo locale
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8788', // Wrangler dev server
        changeOrigin: true,
      },
    },
  },
});
```

### 2.2 `frontend/package.json` — Scripts

```json
{
  "name": "edumind-frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext js,jsx --report-unused-disable-directives"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "framer-motion": "^10.16.0",
    "zustand": "^4.4.0",
    "@tanstack/react-query": "^5.0.0",
    "lucide-react": "^0.263.0",
    "recharts": "^2.9.0",
    "react-hot-toast": "^2.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "eslint": "^8.45.0"
  }
}
```

---

## 📋 Step 3 — Cloudflare Pages Functions (Backend Serverless)

Le **Pages Functions** girano come Cloudflare Workers: nessun server da gestire, scalano automaticamente.

### 3.1 Middleware Autenticazione — `functions/_middleware.js`

```javascript
// Eseguito su OGNI richiesta alle /api/*
export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);

  // Percorsi pubblici (no auth richiesta)
  const PUBLIC_PATHS = ['/api/auth/login', '/api/auth/register'];
  if (PUBLIC_PATHS.includes(url.pathname)) {
    return next();
  }

  // Verifica JWT
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Non autorizzato' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const token = authHeader.split(' ')[1];
    // Verifica token con JWT (usa env.JWT_SECRET)
    // Aggiungi user al context per le funzioni downstream
    context.data.user = await verifyToken(token, env.JWT_SECRET);
    return next();
  } catch {
    return new Response(JSON.stringify({ error: 'Token non valido' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
```

### 3.2 Route AI — `functions/api/ai.js`

```javascript
// POST /api/ai
// Body: { question, documentContext, conversationHistory, studentProfile, subject }

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { question, documentContext, conversationHistory, studentProfile, subject } = body;

    // Costruisci system prompt adattivo
    const systemPrompt = buildSystemPrompt(studentProfile, subject, documentContext);

    // Chiama Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        system: systemPrompt,
        messages: [
          ...conversationHistory,
          { role: 'user', content: question },
        ],
      }),
    });

    const data = await response.json();
    const answerText = data.content[0].text;

    // Salva su Supabase
    const supabase = createSupabaseClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
    await supabase.from('questions').insert({
      student_id: context.data.user.id,
      question_text: question,
      ai_answer: answerText,
      subject_id: subject,
    });

    return new Response(JSON.stringify({ answer: answerText }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
```

### 3.3 Route Upload Documenti — `functions/api/documents/upload.js`

```javascript
// POST /api/documents/upload
// Multipart form-data: file + metadata

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const subjectId = formData.get('subjectId');
    const title = formData.get('title');

    // Leggi il file come ArrayBuffer
    const fileBuffer = await file.arrayBuffer();
    const fileBytes = new Uint8Array(fileBuffer);

    // Upload su Supabase Storage
    const supabase = createSupabaseClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
    const fileName = `${subjectId}/${Date.now()}_${file.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(fileName, fileBytes, { contentType: file.type });

    if (uploadError) throw uploadError;

    // Ottieni URL pubblico
    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(fileName);

    // Salva metadati nel DB
    const { data: doc } = await supabase.from('documents').insert({
      teacher_id: context.data.user.id,
      subject_id: subjectId,
      title,
      file_name: file.name,
      file_url: publicUrl,
    }).select().single();

    return new Response(JSON.stringify({ success: true, document: doc }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
```

---

## 📋 Step 4 — File di Configurazione Cloudflare

### 4.1 `wrangler.toml` (nella root del progetto)

```toml
# wrangler.toml — Configurazione Cloudflare Pages + Workers

name = "edumind"
compatibility_date = "2024-01-01"

# Directory del build output frontend
pages_build_output_dir = "frontend/dist"

# Variabili d'ambiente (i valori reali vanno nel dashboard Cloudflare)
[vars]
NODE_ENV = "production"

# Binding KV per cache (opzionale, per sessioni veloci)
# [[kv_namespaces]]
# binding = "EDUMIND_CACHE"
# id = "xxx"

# R2 per storage file (alternativa a Supabase Storage)
# [[r2_buckets]]
# binding = "DOCUMENTS_BUCKET"
# bucket_name = "edumind-documents"
```

### 4.2 `frontend/public/_redirects`

```
# Cloudflare Pages — SPA Routing
# Necessario per React Router (tutte le route → index.html)
/*    /index.html    200
```

### 4.3 `frontend/public/_headers`

```
# Headers di sicurezza per tutte le pagine
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

# Cache aggressiva per assets statici
/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

---

## 📋 Step 5 — Collegare GitHub a Cloudflare Pages

### 5.1 Primo Deploy — Procedura Guidata

1. Vai su **[pages.cloudflare.com](https://pages.cloudflare.com)**
2. Clicca **"Create a project"**
3. Scegli **"Connect to Git"**
4. Autorizza Cloudflare ad accedere al tuo GitHub
5. Seleziona il repository **`edumind`**
6. Configura le impostazioni di build:

```
┌─────────────────────────────────────────────┐
│  IMPOSTAZIONI BUILD CLOUDFLARE PAGES        │
├─────────────────────────────────────────────┤
│  Framework preset:    None (custom)         │
│  Build command:       cd frontend && npm ci │
│                       && npm run build      │
│  Build output dir:    frontend/dist         │
│  Root directory:      /  (root del repo)    │
│  Node.js version:     18 (o 20)             │
└─────────────────────────────────────────────┘
```

7. Clicca **"Save and Deploy"** → Cloudflare fa il primo build!

### 5.2 Aggiungere le Variabili d'Ambiente

Dopo il primo deploy, vai su:
**Settings → Environment Variables** e aggiungi:

```
ANTHROPIC_API_KEY        = sk-ant-...
SUPABASE_URL             = https://xxx.supabase.co
SUPABASE_ANON_KEY        = eyJ...
SUPABASE_SERVICE_KEY     = eyJ...
JWT_SECRET               = una-stringa-random-di-almeno-32-caratteri
```

> ⚠️ **Importante:** Aggiungi le variabili sia per **Production** che per **Preview**.
> Poi vai su **Deployments → Retry last deployment** per applicarle.

---

## 📋 Step 6 — Deploy Continuo (CD automatico)

Da questo momento, il workflow è:

```
Tu scrivi codice → git push → GitHub → Cloudflare Pages build automatico
                                              ↓
                                   URL preview per ogni branch
                                              ↓
                              Merge su main → deploy in produzione
```

### Flusso Branch Consigliato

```bash
# Sviluppo nuova feature
git checkout -b feature/learning-style-test
# ... lavori su TRAE ...
git add .
git commit -m "feat: aggiungi test stili di apprendimento"
git push origin feature/learning-style-test
# → Cloudflare genera URL preview: https://feature-xxx.edumind.pages.dev

# Quando è pronto, merge su main
git checkout main
git merge feature/learning-style-test
git push origin main
# → Deploy automatico in produzione: https://edumind.pages.dev
```

---

## 📋 Step 7 — Dominio Personalizzato (Opzionale)

### Aggiungere un dominio custom

1. **Dashboard Cloudflare Pages** → il tuo progetto
2. **Custom domains** → **"Set up a custom domain"**
3. Inserisci es. `edumind.it` o `app.edumind.it`
4. Cloudflare aggiorna automaticamente i DNS (se il dominio è su Cloudflare)
5. SSL/TLS automatico e gratuito ✅

---

## 📋 Step 8 — Sviluppo Locale con Wrangler

Per testare le Pages Functions in locale (simula l'ambiente Cloudflare):

### 8.1 Installa Wrangler

```bash
npm install -g wrangler
wrangler login  # Apre il browser per autenticazione
```

### 8.2 File `.dev.vars` (variabili locali, NON committare)

```env
# .dev.vars — usato da wrangler pages dev
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...
JWT_SECRET=local-dev-secret
```

### 8.3 Script di sviluppo locale

```bash
# Terminale 1 — Frontend Vite
cd frontend
npm run dev
# → http://localhost:5173

# Terminale 2 — Functions Cloudflare (backend)
wrangler pages dev frontend/dist --port 8788
# → http://localhost:8788 (proxied dal frontend via vite.config.js)
```

### 8.4 `package.json` root (per comodità)

```json
{
  "name": "edumind",
  "scripts": {
    "dev:frontend": "cd frontend && npm run dev",
    "dev:functions": "wrangler pages dev frontend/dist --port 8788",
    "build": "cd frontend && npm ci && npm run build",
    "deploy": "wrangler pages deploy frontend/dist",
    "lint": "cd frontend && npm run lint"
  },
  "devDependencies": {
    "wrangler": "^3.0.0"
  }
}
```

---

## 📋 Step 9 — GitHub Actions (CI opzionale)

Per aggiungere test automatici prima del deploy:

### `.github/workflows/deploy.yml`

```yaml
name: EduMind CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout codice
        uses: actions/checkout@v4
      
      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Installa dipendenze
        run: cd frontend && npm ci
      
      - name: Lint
        run: cd frontend && npm run lint
      
      - name: Build
        run: cd frontend && npm run build
      
      # Cloudflare Pages fa il deploy automatico via Git integration
      # Questo job serve solo per validare che il build funzioni
      - name: Verifica build output
        run: ls -la frontend/dist/
```

---

## 🐛 Troubleshooting Comune

### ❌ "Build failed: Cannot find module"
```bash
# Assicurati che il build command includa npm ci
cd frontend && npm ci && npm run build
```

### ❌ "404 su refresh delle route React"
```
Assicurati che il file frontend/public/_redirects esista con:
/*    /index.html    200
```

### ❌ "Environment variable undefined in Functions"
```
Le variabili devono essere aggiunte nel Dashboard Cloudflare Pages
(non nel wrangler.toml per i valori segreti).
Dopo averle aggiunte, fai "Retry deployment".
```

### ❌ "CORS error su chiamate API"
```javascript
// Aggiungi headers CORS nelle functions
return new Response(JSON.stringify(data), {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://edumind.pages.dev',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
});
```

### ❌ "Wrangler: no such file or directory (frontend/dist)"
```bash
# Prima fai il build del frontend, poi lancia wrangler
cd frontend && npm run build
cd ..
wrangler pages dev frontend/dist
```

---

## ✅ Checklist Deploy

### Pre-deploy
- [ ] Repository GitHub creato e codice pushato su `main`
- [ ] File `_redirects` in `frontend/public/`
- [ ] File `_headers` in `frontend/public/`
- [ ] `wrangler.toml` configurato nella root
- [ ] `.env` aggiunto al `.gitignore`
- [ ] Build locale funzionante (`npm run build`)

### Su Cloudflare Pages Dashboard
- [ ] Progetto creato e collegato al repo GitHub
- [ ] Build command: `cd frontend && npm ci && npm run build`
- [ ] Build output dir: `frontend/dist`
- [ ] Tutte le variabili d'ambiente aggiunte (production + preview)
- [ ] Primo deploy completato con successo ✅

### Post-deploy
- [ ] URL `https://edumind.pages.dev` raggiungibile
- [ ] Route React funzionanti (no 404 su refresh)
- [ ] Chiamate API `/api/*` funzionanti
- [ ] Variabili d'ambiente caricate correttamente

---

## 🔗 Risorse Utili

| Risorsa | URL |
|---------|-----|
| Cloudflare Pages Docs | https://developers.cloudflare.com/pages |
| Pages Functions Docs | https://developers.cloudflare.com/pages/functions |
| Wrangler CLI Docs | https://developers.cloudflare.com/workers/wrangler |
| Supabase Docs | https://supabase.com/docs |
| Anthropic API Docs | https://docs.anthropic.com |
| GitHub Actions Docs | https://docs.github.com/actions |

---

*EduMind su Cloudflare Pages — Deploy in pochi minuti, performance globale* 🌍

**Versione guida:** 1.0.0 | **Marzo 2026**
