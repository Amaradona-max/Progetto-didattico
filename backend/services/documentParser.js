const extractText = async (buffer, mimetype) => {
  if (!buffer) return ''
  if (mimetype === 'text/plain') {
    return buffer.toString('utf-8')
  }
  return 'Contenuto estratto placeholder'
}

const chunkText = (text, size) => {
  if (!text) return []
  const chunks = []
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size))
  }
  return chunks
}

module.exports = { extractText, chunkText }
