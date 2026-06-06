export const mapDocument = (doc) => ({
  id: doc.id,
  fileName: doc.fileName ?? doc.originalFileName,
  fileType: doc.fileType ?? doc.contentType,
  fileUrl: doc.fileUrl ?? (doc.id ? `/api/documents/${doc.id}/download` : null),
  size: doc.size ?? doc.fileSize,
  uploadedAt: doc.uploadedAt ?? doc.createdAt,
  documentType: doc.documentType,
});

export function mapDocuments(docs) {
  if (!Array.isArray(docs)) return [];
  return docs.map(mapDocument);
}
