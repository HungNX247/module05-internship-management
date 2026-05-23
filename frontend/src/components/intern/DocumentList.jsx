function formatFileSize(size) {
  if (!size && size !== 0) return "-";

  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function DocumentList({ documents }) {
  if (!documents || documents.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">📄</div>
        <p className="empty-state__title">Chưa có tài liệu</p>
        <p className="empty-state__desc">
          Intern chưa upload CV hoặc đơn xin thực tập.
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
              {document.fileName || "Tài liệu"}
            </div>
            <div className="document-item__meta">
              <span>{document.fileType || "-"}</span>
              <span>{formatFileSize(document.fileSize)}</span>
              <span>{document.uploadedAt || "-"}</span>
            </div>
          </div>

          {document.fileUrl && (
            <a
              className="document-item__link"
              href={document.fileUrl}
              target="_blank"
              rel="noreferrer"
            >
              Xem file
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export default DocumentList;
