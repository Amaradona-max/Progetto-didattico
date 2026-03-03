const fs = require('fs').promises;
const path = require('path');
const { put, list, del } = require('@vercel/blob');

const LOCAL_STORAGE_PATH = path.join(__dirname, '../data/documents.json');
const BLOB_FILENAME = 'documents.json';

const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

const loadDocuments = async () => {
  try {
    if (useBlob) {
      const { blobs } = await list();
      const documentBlob = blobs.find(b => b.pathname === BLOB_FILENAME);
      if (!documentBlob) return [];
      
      const response = await fetch(documentBlob.url);
      if (!response.ok) return [];
      return await response.json();
    } else {
      try {
        const data = await fs.readFile(LOCAL_STORAGE_PATH, 'utf-8');
        return JSON.parse(data || '[]');
      } catch (err) {
        if (err.code === 'ENOENT') {
          // Se il file non esiste, assicuriamoci che la cartella esista
          const dir = path.dirname(LOCAL_STORAGE_PATH);
          await fs.mkdir(dir, { recursive: true });
          await fs.writeFile(LOCAL_STORAGE_PATH, '[]');
          return [];
        }
        throw err;
      }
    }
  } catch (error) {
    console.error('Error loading documents:', error);
    return [];
  }
};

const saveDocuments = async (documents) => {
  try {
    const content = JSON.stringify(documents, null, 2);
    if (useBlob) {
      await put(BLOB_FILENAME, content, {
        addRandomSuffix: false,
        contentType: 'application/json',
      });
    } else {
      await fs.writeFile(LOCAL_STORAGE_PATH, content, 'utf-8');
    }
  } catch (error) {
    console.error('Error saving documents:', error);
    throw error;
  }
};

const addDocuments = async (newDocuments) => {
  const documents = await loadDocuments();
  documents.push(...newDocuments);
  await saveDocuments(documents);
  return documents;
};

const listDocuments = async ({ subjectId } = {}) => {
  const documents = await loadDocuments();
  const filtered = subjectId
    ? documents.filter((doc) => doc.subjectId === subjectId)
    : documents;
  return filtered.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
};

const getContext = async ({ subjectId, documentId }) => {
  const documents = await loadDocuments();
  if (documentId) {
    const doc = documents.find((item) => item.id === documentId);
    return doc ? doc.chunks.join('\n') : '';
  }
  if (subjectId) {
    return documents
      .filter((item) => item.subjectId === subjectId)
      .flatMap((item) => item.chunks)
      .join('\n');
  }
  return '';
};

module.exports = { addDocuments, listDocuments, getContext }
