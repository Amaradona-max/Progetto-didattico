const fs = require('fs')
const path = require('path')

const dataDir = path.join(__dirname, '..', 'data')
const dataFile = path.join(dataDir, 'documents.json')

const ensureStore = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, '[]', 'utf-8')
  }
}

const loadDocuments = () => {
  ensureStore()
  const raw = fs.readFileSync(dataFile, 'utf-8')
  return JSON.parse(raw || '[]')
}

const saveDocuments = (documents) => {
  ensureStore()
  fs.writeFileSync(dataFile, JSON.stringify(documents, null, 2), 'utf-8')
}

const addDocuments = (newDocuments) => {
  const documents = loadDocuments()
  documents.push(...newDocuments)
  saveDocuments(documents)
  return documents
}

const listDocuments = ({ subjectId } = {}) => {
  const documents = loadDocuments()
  const filtered = subjectId
    ? documents.filter((doc) => doc.subjectId === subjectId)
    : documents
  return filtered.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}

const getContext = ({ subjectId, documentId }) => {
  const documents = loadDocuments()
  if (documentId) {
    const doc = documents.find((item) => item.id === documentId)
    return doc ? doc.chunks.join('\n') : ''
  }
  if (subjectId) {
    return documents
      .filter((item) => item.subjectId === subjectId)
      .flatMap((item) => item.chunks)
      .join('\n')
  }
  return ''
}

module.exports = { addDocuments, listDocuments, getContext }
