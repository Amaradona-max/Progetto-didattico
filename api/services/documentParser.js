const pdf = require('pdf-parse');

const extractText = async (buffer, mimetype) => {
  if (!buffer) return ''
  
  try {
    if (mimetype === 'text/plain') {
      return buffer.toString('utf-8')
    }
    
    if (mimetype === 'application/pdf') {
      const data = await pdf(buffer);
      return data.text;
    }
    
    return `[Contenuto di tipo ${mimetype} non ancora supportato per l'estrazione completa]`
  } catch (error) {
    console.error('Errore durante l\'estrazione del testo:', error);
    return 'Errore durante l\'estrazione del testo dal file.'
  }
}

const chunkText = (text, size) => {
  if (!text) return []
  const chunks = []
  // Rimuoviamo spazi multipli e andate a capo eccessive per ottimizzare i token
  const cleanText = text.replace(/\s+/g, ' ').trim();
  
  for (let i = 0; i < cleanText.length; i += size) {
    chunks.push(cleanText.slice(i, i + size))
  }
  return chunks
}

module.exports = { extractText, chunkText }
