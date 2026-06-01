function formatFileSize(size) {
  if (size === null || size === undefined) return "—";

  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function displayValue(value) {
  if (value === null || value === undefined || value === "") return "—";
  return value;
}

function DocumentList({ documents, showDownloadActions = false }) {
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
      {documents.map((document) => {
        const canDownload = showDownloadActions && Boolean(document.fileUrl);

        return (
          <div className="document-item" key={document.id}>
            <div className="document-item__icon">📄</div>
            <div className="document-item__content">
              <div className="document-item__name">
                {displayValue(document.fileName)}
              </div>
              <div className="document-item__meta">
                {document.documentType && (
                  <span>{displayValue(document.documentType)}</span>
                )}
                <span>{displayValue(document.fileType)}</span>
                <span>{formatFileSize(document.size)}</span>
                <span>{displayValue(document.uploadedAt)}</span>
              </div>
            </div>

            {canDownload && (
              <div className="document-item__actions">
                <a
                  className="document-item__link"
                  href={document.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Xem
                </a>
                <a
                  className="document-item__link"
                  href={document.fileUrl}
                  download
                >
                  Tải
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default DocumentList;
