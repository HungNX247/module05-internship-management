/**
 * Map DocumentResponse từ BE sang model hiển thị UI.
 * Sprint 2: không có API download — không dùng filePath, không tự tạo URL tải file.
 */
function resolvePublicDownloadUrl(doc) {
  const candidate = doc.downloadUrl ?? doc.fileUrl;
  if (!candidate || typeof candidate !== "string") {
    return null;
  }

  const url = candidate.trim();
  if (!url) return null;

  if (doc.filePath && url === doc.filePath) return null;
  if (url.includes("\\") || /^[A-Za-z]:/.test(url)) return null;
  if (
    url.startsWith("uploads/") ||
    url.startsWith("/uploads/") ||
    url.includes("/documents/") && url.includes("/download")
  ) {
    return null;
  }

  return /^https?:\/\//i.test(url) ? url : null;
}

export const mapDocument = (doc) => ({
  id: doc.id,
  fileName: doc.fileName ?? doc.originalFileName ?? null,
  fileType: doc.fileType ?? doc.contentType ?? null,
  fileUrl: resolvePublicDownloadUrl(doc),
  size: doc.size ?? doc.fileSize ?? null,
  uploadedAt: doc.uploadedAt ?? doc.createdAt ?? null,
  documentType: doc.documentType ?? null,
});

export function mapDocuments(docs) {
  if (!Array.isArray(docs)) return [];
  return docs.map(mapDocument);
}
