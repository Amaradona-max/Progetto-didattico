const { put, get, del } = require('@vercel/blob');

const BLOB_KEY = 'documents.json';

const loadDocuments = async () => {
  try {
    const blob = await get(BLOB_KEY);
    if (!blob) return [];
    const raw = await blob.text();
    return JSON.parse(raw || '[]');
  } catch (error) {
    if (error.status === 404) {
      console.log('Blob not found, creating a new one.');
      await saveDocuments([]);
      return [];
    }
    console.error('Error loading documents from blob:', error);
    throw error; // Re-throw other errors
  }
};

const saveDocuments = async (documents) => {
  await put(BLOB_KEY, JSON.stringify(documents, null, 2), {
    access: 'public',
    contentType: 'application/json',
  });
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
