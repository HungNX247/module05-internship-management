import { documentApi } from "../../api/documentApi";

function formatFileSize(size) {
  if (size === null || size === undefined) return "-";

  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function displayValue(value) {
  if (value === null || value === undefined || value === "") return "-";
  return value;
}

async function getDocumentBlob(document) {
  if (!document?.id) return null;
  return documentApi.downloadDocument(document.id);
}

async function openDocument(document) {
  const blob = await getDocumentBlob(document);
  if (!blob) return;

  const url = URL.createObjectURL(blob);
  window.open(url, "_blank", "noopener,noreferrer");
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

async function saveDocument(document) {
  const blob = await getDocumentBlob(document);
  if (!blob) return;

  const url = URL.createObjectURL(blob);
  const link = window.document.createElement("a");
  link.href = url;
  link.download = document.fileName || "tai-lieu";
  window.document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function DocumentList({ documents }) {
  if (!documents || documents.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">📄</div>
        <p className="empty-state__title">Chưa có tài liệu</p>
        <p className="empty-state__desc">
          Tải CV hoặc đơn xin thực tập lên để hoàn thiện hồ sơ.
        </p>
      </div>
    );
  }

  return (
    <div className="document-list">
      {documents.map((document) => (
        <div className="document-item" key={document.id}>
          <div className="document-item__icon">📄</div>
          <div className="document-item__content">
            <div className="document-item__name">
              {displayValue(document.fileName)}
            </div>
            <div className="document-item__meta">
              <span>{displayValue(document.fileType)}</span>
              <span>{formatFileSize(document.size)}</span>
              <span>{displayValue(document.uploadedAt)}</span>
            </div>
          </div>

          {document.id && (
            <div className="document-item__actions">
              <button
                type="button"
                className="document-item__link"
                onClick={() => openDocument(document)}
              >
                Xem
              </button>
              <button
                type="button"
                className="document-item__link"
                onClick={() => saveDocument(document)}
              >
                Tải
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DocumentList;
