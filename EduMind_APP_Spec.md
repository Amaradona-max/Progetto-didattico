# 🎓 EduMind — App Didattica Intelligente per il Biennio ITIS
### Specifica Tecnica Completa per TRAE Editor

---

## 📌 Panoramica del Progetto

**EduMind** è una web app educativa AI-powered pensata per studenti del biennio degli istituti tecnici (ITIS). Il sistema permette agli insegnanti di caricare materiale didattico e agli studenti di interagire con esso tramite domande intelligenti, favorendo un apprendimento attivo, critico e personalizzato.

> **Vision**: Trasformare ogni documento scolastico in un tutor interattivo che conosce il tuo stile di apprendimento.

---

## 🏗️ Architettura Generale

```
EduMind/
├── frontend/          # React + Vite + TailwindCSS
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Dashboard.jsx        # Dashboard studente
│   │   │   ├── TeacherPanel.jsx     # Pannello insegnante
│   │   │   ├── SubjectRoom.jsx      # Stanza materia
│   │   │   ├── StudySession.jsx     # Sessione di studio AI
│   │   │   ├── LearningStyle.jsx    # Test stili apprendimento
│   │   │   ├── Credits.jsx          # Sistema crediti
│   │   │   └── Verification.jsx     # Fase di verifica
│   │   ├── components/
│   │   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── ChatAI.jsx           # Componente chat con AI
│   │   │   ├── DocumentViewer.jsx   # Visualizzatore documenti
│   │   │   ├── StudentCard.jsx      # Scheda personalizzata studente
│   │   │   ├── CreditBadge.jsx      # Badge crediti guadagnati
│   │   │   ├── SubjectCard.jsx      # Card materia
│   │   │   └── LearningStyleBadge.jsx
│   │   ├── hooks/
│   │   │   ├── useAI.js             # Hook per chiamate Anthropic API
│   │   │   ├── useStorage.js        # Hook persistenza dati
│   │   │   └── useCredits.js        # Hook sistema crediti
│   │   └── store/                   # Zustand state management
│
├── backend/           # Node.js + Express (oppure Next.js API routes)
│   ├── routes/
│   │   ├── auth.js
│   │   ├── documents.js             # Upload e gestione file
│   │   ├── ai.js                    # Proxy Anthropic API
│   │   ├── students.js
│   │   └── credits.js
│   ├── services/
│   │   ├── documentParser.js        # PDF/DOC parser → testo
│   │   ├── anthropicService.js      # Integrazione Claude API
│   │   └── creditEngine.js          # Logica calcolo crediti
│   └── models/                      # Schema DB (PostgreSQL o Supabase)
│
└── README.md
```

---

## 🎨 Design System & UI/UX

### Palette Colori (tema giovane e dinamico)

```css
:root {
  --primary: #6C63FF;        /* Viola elettrico — colore principale */
  --secondary: #FF6584;      /* Rosa caldo — accenti */
  --accent: #43E97B;         /* Verde successo / crediti */
  --warning: #FFB347;        /* Arancio — avvisi / quiz */
  --dark: #1A1A2E;           /* Background scuro */
  --surface: #16213E;        /* Card background */
  --surface-light: #0F3460;  /* Surface elevata */
  --text-primary: #EAEAEA;
  --text-secondary: #A0AEC0;
}
```

### Font
```
Titoli: "Poppins" (Bold 700, SemiBold 600)
Corpo:  "Inter" (Regular 400, Medium 500)
Codice: "Fira Code" (monospace per formule)
```

### Filosofia Design
- **Dark mode di default** (preferita dai ragazzi)
- **Microanimazioni** su ogni interazione (Framer Motion)
- **Gamification visiva**: barre progresso, badge, XP bar
- **Mobile-first**: ottimizzato per smartphone
- **No information overload**: un concetto alla volta

---

## 📚 Materie — Biennio ITIS

```javascript
const SUBJECTS = [
  { id: "diritto",        name: "Diritto",              icon: "⚖️",  color: "#FF6B6B" },
  { id: "matematica",     name: "Matematica",           icon: "📐",  color: "#4ECDC4" },
  { id: "biologia",       name: "Biologia",             icon: "🧬",  color: "#45B7D1" },
  { id: "italiano",       name: "Italiano",             icon: "📖",  color: "#96CEB4" },
  { id: "storia",         name: "Storia",               icon: "🏛️",  color: "#FFEAA7" },
  { id: "fisica",         name: "Fisica",               icon: "⚡",  color: "#DDA0DD" },
  { id: "chimica",        name: "Chimica",              icon: "🧪",  color: "#98D8C8" },
  { id: "disegno",        name: "Disegno Tecnico",      icon: "📏",  color: "#F7DC6F" },
  { id: "tea",            name: "TEA",                  icon: "🔧",  color: "#A9CCE3" },
  { id: "religione",      name: "Religione",            icon: "☯️",  color: "#D5DBDB" },
  { id: "educazione_civ", name: "Educazione Civica",    icon: "🗳️",  color: "#82E0AA" },
  { id: "educazione_fis", name: "Educazione Fisica",    icon: "🏃",  color: "#F0B27A" },
];
```

---

## 👤 Ruoli Utente

### 1. Insegnante (`role: "teacher"`)
- Crea e gestisce le stanze per materia
- Carica materiale didattico (PDF, DOCX, TXT, PPTX, immagini)
- Configura i parametri AI per ogni documento
- Visualizza statistiche domande degli studenti
- Approva/modifica la scheda stile di apprendimento degli studenti
- Crea quiz di verifica

### 2. Studente (`role: "student"`)
- Accede alle stanze delle materie
- Completa il test sugli stili di apprendimento
- Studia con l'AI in modalità personalizzata
- Pone domande sui documenti caricati
- Accumula crediti
- Affronta la fase di verifica

---

## 🧠 Test Stili di Apprendimento

### Modello di Riferimento: VARK + Gardner

```javascript
const LEARNING_STYLES = {
  visual:     { label: "Visivo",      icon: "👁️",  color: "#6C63FF", desc: "Apprendi meglio con immagini, schemi e mappe mentali" },
  auditory:   { label: "Uditivo",     icon: "👂",  color: "#FF6584", desc: "Apprendi meglio ascoltando spiegazioni e discussioni" },
  reading:    { label: "Lettura",     icon: "📚",  color: "#43B89C", desc: "Apprendi meglio leggendo e prendendo appunti dettagliati" },
  kinesthetic:{ label: "Pratico",     icon: "🤲",  color: "#FFB347", desc: "Apprendi meglio con esempi concreti ed esperienze dirette" },
};
```

### Flusso Test
1. Questionario di 20 domande (con illustrazioni animate)
2. Calcolo percentuale per ogni stile
3. Generazione **Scheda Personale Studente** automatica
4. L'AI adatta le risposte allo stile rilevato

### Prompt AI adattivo per stile

```javascript
function buildSystemPrompt(student, subject) {
  const styleInstructions = {
    visual: `Usa sempre schemi ASCII, elenchi strutturati, analogie visive. 
              Suggerisci mappe mentali. Descrivi come "immagina che..."`,
    auditory: `Spiega come se stessi parlando ad alta voce. 
                Usa ritmo nella spiegazione, ripeti i concetti chiave con variazioni.`,
    reading: `Fornisci definizioni precise, usa terminologia tecnica corretta. 
               Suggerisci pagine di approfondimento e appunti strutturati.`,
    kinesthetic: `Usa sempre esempi pratici dalla vita reale. 
                   Inizia da casi concreti e poi astrai il concetto.`,
  };

  return `Sei EduMind AI, un tutor esperto di ${subject} per studenti del biennio ITIS.
  
  Lo studente si chiama ${student.name} e il suo stile di apprendimento predominante è: ${student.learningStyle}.
  
  ISTRUZIONI DI ADATTAMENTO:
  ${styleInstructions[student.learningStyle]}
  
  REGOLE GENERALI:
  - Rispondi sempre in italiano
  - Sii incoraggiante ma preciso
  - Se la domanda è vaga, chiedi chiarimenti
  - Usa emoji con moderazione per rendere il testo più vivace
  - Valuta la qualità della domanda (1-5 stelle) e assegna crediti
  - Lunghezza risposta: adeguata alla complessità, mai oltre 400 parole
  
  DOCUMENTO DI RIFERIMENTO:
  {documentContext}`;
}
```

---

## 📤 Sistema di Upload Documenti (Insegnante)

### Formati Supportati
```
PDF  (.pdf)   → estratto con pdf-parse o pdfjs-dist
DOCX (.docx)  → estratto con mammoth.js
TXT  (.txt)   → lettura diretta
PPTX (.pptx)  → estratto con officegen/pptx-parser
IMG  (.jpg, .png) → OCR con Tesseract.js (opzionale)
```

### Pipeline di Processing

```
File Upload → Validazione → Estrazione Testo → Chunking → 
Salvataggio DB → Indicizzazione → Disponibile per studenti
```

### Backend Route: `POST /api/documents/upload`

```javascript
// Multer per file handling
// Limite: 50MB per file
// Storage: Supabase Storage o AWS S3

router.post('/upload', 
  authenticate, 
  authorize('teacher'),
  upload.single('document'),
  async (req, res) => {
    const { subjectId, title, description } = req.body;
    const fileBuffer = req.file.buffer;
    
    // 1. Estrai testo in base al formato
    const text = await extractText(fileBuffer, req.file.mimetype);
    
    // 2. Dividi in chunks (max 2000 token per chunk)
    const chunks = chunkText(text, 2000);
    
    // 3. Salva su DB con metadati
    const doc = await Document.create({
      subjectId, title, description,
      chunks, teacherId: req.user.id,
      fileName: req.file.originalname
    });
    
    res.json({ success: true, documentId: doc.id });
  }
);
```

---

## 💬 Sessione di Studio AI — Fase di Apprendimento

### Componente: `StudySession.jsx`

#### Funzionalità
1. **Selezione documento** dall'archivio della materia
2. **Visualizzatore documento** (sidebar sinistra)
3. **Chat AI** (area principale)
4. **Indicatore crediti** in tempo reale (top right)
5. **Valutazione domande** (qualità + quantità)

#### Sistema di Valutazione Domande

```javascript
// L'AI valuta ogni domanda e restituisce un oggetto strutturato
const evaluateQuestion = async (question, context) => {
  const response = await claude.messages.create({
    model: "claude-sonnet-4-20250514",
    messages: [{
      role: "user",
      content: `Valuta questa domanda di uno studente nel contesto dello studio.
      
      DOMANDA: "${question}"
      CONTESTO: "${context}"
      
      Rispondi SOLO con JSON:
      {
        "quality_score": 1-5,        // profondità e pertinenza
        "credits_earned": 1-10,      // crediti da assegnare  
        "feedback": "string",        // feedback breve per lo studente
        "answer": "string"           // risposta completa
      }`
    }]
  });
  
  return JSON.parse(response.content[0].text);
};
```

#### Criteri Punteggio Domande

| Livello | Descrizione | Crediti |
|---------|-------------|---------|
| ⭐ (1) | Domanda vaga o off-topic | 1 |
| ⭐⭐ (2) | Domanda semplice, definizione | 2 |
| ⭐⭐⭐ (3) | Domanda di comprensione | 4 |
| ⭐⭐⭐⭐ (4) | Domanda critica, collega concetti | 7 |
| ⭐⭐⭐⭐⭐ (5) | Domanda approfondita, originale | 10 |

---

## 🏆 Sistema Crediti (Gamification)

### Logica Crediti

```javascript
const CREDIT_ACTIONS = {
  COMPLETE_LEARNING_STYLE_TEST: 50,   // Una volta sola
  FIRST_QUESTION_PER_SESSION: 5,      // Bonus prima domanda
  QUESTION_QUALITY_BONUS: (score) => score * 2,  // Basato su quality_score
  COMPLETE_STUDY_SESSION: 20,         // Sessione > 15 minuti
  PASS_VERIFICATION_QUIZ: 100,        // Superare fase verifica
  DAILY_STREAK_BONUS: 15,             // Accesso giornaliero
  HELP_CLASSMATE: 30,                 // Funzione futura: peer learning
};
```

### Badge Sbloccabili

```javascript
const BADGES = [
  { id: "first_steps",    name: "Primi Passi",     icon: "👶", condition: credits >= 50 },
  { id: "curious_mind",   name: "Mente Curiosa",   icon: "🔍", condition: totalQuestions >= 20 },
  { id: "deep_thinker",   name: "Pensatore",        icon: "🧠", condition: avgQualityScore >= 4 },
  { id: "scholar",        name: "Studioso",         icon: "📚", condition: credits >= 500 },
  { id: "top_student",    name: "Top Student",      icon: "🏆", condition: credits >= 1000 },
  { id: "diritto_expert", name: "Giurista",         icon: "⚖️", condition: questionsInSubject("diritto") >= 30 },
];
```

---

## 📝 Fase di Verifica

### Flusso Verifica

```
Insegnante crea quiz → Studente riceve notifica → 
Sessione verificata (no AI help) → Risposte valutate dall'AI → 
Report insegnante + Feedback studente
```

### Tipologie Domande Quiz

```javascript
const QUESTION_TYPES = {
  MULTIPLE_CHOICE:  "Scelta Multipla",
  OPEN_ENDED:       "Domanda Aperta (valutata da AI)",
  TRUE_FALSE:       "Vero/Falso",
  FILL_BLANK:       "Completamento",
  CASE_STUDY:       "Caso Pratico (per Diritto)",  // Speciale per materie giuridiche
};
```

### Valutazione AI Risposte Aperte

```javascript
const gradeOpenAnswer = async (question, studentAnswer, expectedConcepts) => {
  // Claude valuta la risposta su una scala 0-10
  // Considera: correttezza, completezza, chiarezza espositiva
  // Restituisce voto + feedback motivazionale dettagliato
};
```

---

## 🗃️ Schema Database

### Tabelle Principali (PostgreSQL / Supabase)

```sql
-- Utenti
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT CHECK (role IN ('student', 'teacher')) NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profilo Studente
CREATE TABLE student_profiles (
  id UUID PRIMARY KEY REFERENCES users(id),
  learning_style TEXT,             -- visual | auditory | reading | kinesthetic
  style_percentages JSONB,         -- { visual: 40, auditory: 20, ... }
  total_credits INT DEFAULT 0,
  badges JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Materie
CREATE TABLE subjects (
  id TEXT PRIMARY KEY,             -- 'diritto', 'matematica', etc.
  name TEXT NOT NULL,
  icon TEXT,
  color TEXT
);

-- Documenti
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES users(id),
  subject_id TEXT REFERENCES subjects(id),
  title TEXT NOT NULL,
  description TEXT,
  file_name TEXT NOT NULL,
  file_url TEXT,
  extracted_text TEXT,             -- Testo estratto per AI
  chunks JSONB,                    -- Array chunks per context window
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sessioni di Studio
CREATE TABLE study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES users(id),
  document_id UUID REFERENCES documents(id),
  subject_id TEXT REFERENCES subjects(id),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  total_questions INT DEFAULT 0,
  total_credits_earned INT DEFAULT 0
);

-- Domande e Risposte
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES study_sessions(id),
  student_id UUID REFERENCES users(id),
  question_text TEXT NOT NULL,
  ai_answer TEXT NOT NULL,
  quality_score INT CHECK (quality_score BETWEEN 1 AND 5),
  credits_earned INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz di Verifica
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES users(id),
  subject_id TEXT REFERENCES subjects(id),
  title TEXT NOT NULL,
  questions JSONB NOT NULL,        -- Array di domande strutturate
  time_limit_minutes INT,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tentativi Quiz
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES quizzes(id),
  student_id UUID REFERENCES users(id),
  answers JSONB NOT NULL,
  score NUMERIC(5,2),
  ai_feedback TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🔌 Integrazione Anthropic Claude API

### Setup Client

```javascript
// services/anthropicService.js
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const MODEL = "claude-sonnet-4-20250514";
export const MAX_TOKENS = 1500;
```

### Funzione Principale Chat

```javascript
export async function askQuestion({ 
  question, 
  documentContext, 
  conversationHistory, 
  studentProfile, 
  subject 
}) {
  const systemPrompt = buildSystemPrompt(studentProfile, subject, documentContext);
  
  const messages = [
    ...conversationHistory,
    { role: "user", content: question }
  ];
  
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: systemPrompt,
    messages,
  });
  
  const rawText = response.content[0].text;
  
  // Tenta di estrarre metadati strutturati dalla risposta
  // L'AI è istruita a includere alla fine un blocco JSON nascosto
  const { answer, quality_score, credits_earned, feedback } = parseAIResponse(rawText);
  
  return { answer, quality_score, credits_earned, feedback };
}
```

---

## 🖥️ Pagine Principali — Specifiche UI

### 1. Landing Page (`/`)
- Hero animato con particelle
- Tagline: *"Studia in modo intelligente, non di più"*
- CTA: Accedi come Studente / Insegnante
- Preview animata delle funzionalità

### 2. Dashboard Studente (`/dashboard`)
- **Barra XP** in cima (crediti totali)
- **Griglia materie** con card animate (12 materie)
- **Attività recenti**: ultime domande poste
- **Badge conquistati** (sezione gamification)
- **Suggerimento giornaliero** basato sullo stile di apprendimento

### 3. Pannello Insegnante (`/teacher`)
- Upload documenti per materia
- Gestione archivio (rinomina, elimina, attiva/disattiva)
- Statistiche: domande per materia, studenti attivi
- Creazione quiz di verifica
- Visualizzazione schede studenti

### 4. Stanza Materia (`/subject/:id`)
- Lista documenti disponibili
- Accesso rapido alla sessione di studio
- Leaderboard crediti della classe (opzionale)
- Quiz attivi in evidenza

### 5. Sessione di Studio (`/study/:documentId`)

```
┌─────────────────────────────────────────────────┐
│  📚 Diritto — Capitolo 3: Contratti   💎 120 CR │
├──────────────────┬──────────────────────────────┤
│                  │                              │
│  📄 DOCUMENTO    │   💬 CHAT CON EDUMIND AI    │
│                  │                              │
│  [PDF Viewer]    │  [AI] Ciao Marco! Sono       │
│  o estratto      │  pronto a studiare Diritto   │
│  testuale con    │  con te. Cosa vuoi           │
│  evidenziature   │  approfondire? 🎯            │
│                  │                              │
│                  │  [Studente] Come si forma    │
│                  │  un contratto?               │
│                  │                              │
│                  │  [AI] Ottima domanda! ⭐⭐⭐  │
│                  │  Un contratto si forma...    │
│                  │  +4 crediti guadagnati! 💎   │
│                  │                              │
│  [Stile: 👁️ VIS] │  [_________________ ➤]     │
└──────────────────┴──────────────────────────────┘
```

### 6. Test Stile di Apprendimento (`/learning-style-test`)
- 20 scenari animati con 4 opzioni ciascuno
- Progress bar gamificata
- Risultato finale con grafico radar
- Generazione automatica scheda studente

---

## 🛠️ Stack Tecnologico Consigliato

### Frontend
```
React 18 + Vite
TailwindCSS 3
Framer Motion (animazioni)
Zustand (state management)
React Query / TanStack Query (data fetching)
React PDF Viewer (visualizzazione PDF)
Recharts (grafici apprendimento)
Lucide React (icone)
```

### Backend
```
Node.js + Express  OPPURE  Next.js 14 (App Router)
PostgreSQL + Prisma ORM  OPPURE  Supabase (BaaS)
Multer (file upload)
pdf-parse (estrazione testo PDF)
mammoth.js (estrazione testo DOCX)
@anthropic-ai/sdk
jsonwebtoken (autenticazione)
```

### Hosting Consigliato
```
Frontend: Vercel
Backend/DB: Supabase (include auth, storage, PostgreSQL)
File Storage: Supabase Storage o Cloudinary
```

---

## 📦 Package.json — Dipendenze Principali

### Frontend (`package.json`)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "framer-motion": "^10.16.0",
    "zustand": "^4.4.0",
    "@tanstack/react-query": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "lucide-react": "^0.263.0",
    "recharts": "^2.9.0",
    "@react-pdf-viewer/core": "^3.12.0",
    "react-hot-toast": "^2.4.0"
  }
}
```

### Backend (`package.json`)
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "@anthropic-ai/sdk": "^0.20.0",
    "@supabase/supabase-js": "^2.38.0",
    "multer": "^1.4.5",
    "pdf-parse": "^1.1.1",
    "mammoth": "^1.6.0",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.0"
  }
}
```

---

## 🔐 Variabili d'Ambiente

```env
# .env
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...
JWT_SECRET=your-super-secret-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🚀 Roadmap di Sviluppo

### Fase 1 — MVP (4-6 settimane)
- [ ] Autenticazione (studente + insegnante)
- [ ] Dashboard base con 12 materie
- [ ] Upload documenti (PDF + DOCX)
- [ ] Chat AI su documento (senza adattamento stile)
- [ ] Sistema crediti base

### Fase 2 — Core Features (4-6 settimane)
- [ ] Test stili di apprendimento
- [ ] Generazione scheda studente
- [ ] AI adattiva allo stile
- [ ] Fase di verifica (quiz base)
- [ ] Badge e gamification

### Fase 3 — Advanced (4+ settimane)
- [ ] Valutazione qualità domande con AI
- [ ] Dashboard analytics insegnante
- [ ] Export report studenti (PDF)
- [ ] Notifiche push
- [ ] Modalità offline (Service Worker)
- [ ] Peer learning (studenti si aiutano)

---

## 🎯 Note Speciali per Diritto

La materia **Diritto** merita un trattamento speciale nel prompt AI:

```javascript
const DIRITTO_SYSTEM_ADDENDUM = `
MATERIA: DIRITTO — Istruzioni Specifiche

- Per i concetti giuridici, cita sempre la fonte normativa (es. art. 1321 c.c.)
- Usa casi pratici e scenari della vita quotidiana degli adolescenti
- Per la fase di verifica, includi CASI PRATICI da analizzare
- Distingui chiaramente: norma → applicazione → esempio concreto
- Glossario: evidenzia i termini tecnici giuridici con [termine]
- Evita linguaggio eccessivamente tecnico, preferisci analogie

Esempio di risposta tipo per Diritto:
"Il contratto [art. 1321 c.c.] è un accordo tra due persone.
Immagina di comprare un cappuccino al bar: tu e il barista 
state facendo un contratto! ☕ Lui ti dà il caffè, tu gli dai i soldi."
`;
```

---

## 📋 Checklist per TRAE

Prima di iniziare lo sviluppo, verifica:

- [ ] Node.js >= 18 installato
- [ ] Account Anthropic con API key
- [ ] Account Supabase (free tier sufficiente per MVP)
- [ ] Variabili d'ambiente configurate
- [ ] Git repository inizializzato
- [ ] TRAE con supporto React + Node.js configurato

---

*EduMind — Dove ogni domanda diventa un'opportunità di crescita* 🌱

**Versione spec:** 1.0.0 | **Ultimo aggiornamento:** Marzo 2026
