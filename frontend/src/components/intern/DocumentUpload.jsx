import { useState, useRef } from "react";
import { Button } from "../common";
import { documentApi } from "../../api/documentApi";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx"];

function getFileExtension(fileName) {
  return fileName.split(".").pop()?.toLowerCase() || "";
}

function DocumentUpload({ internProfileId, onUploaded }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState("CV");
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  
  const fileInputRef = useRef(null);

  function validateFile(file) {
    if (!file) {
      return "Vui lòng chọn file";
    }

    const extension = getFileExtension(file.name);

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      return "Chỉ cho phép upload file PDF, DOC, DOCX";
    }

    if (file.size > MAX_FILE_SIZE) {
      return "File vượt quá dung lượng cho phép 5MB";
    }

    return "";
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setErrorMessage("");
    setSuccessMessage("");
  }

  // Drag and drop handlers
  function handleDragOver(e) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave() {
    setIsDragOver(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files?.[0] || null;
    if (file) {
      const error = validateFile(file);
      if (error) {
        setErrorMessage(error);
        setSelectedFile(null);
      } else {
        setSelectedFile(file);
        setErrorMessage("");
        setSuccessMessage("");
      }
    }
  }

  async function handleUpload(event) {
    event.preventDefault();

    if (!internProfileId) {
      setErrorMessage("Cần lưu hồ sơ trước khi upload tài liệu");
      return;
    }

    const validationError = validateFile(selectedFile);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      setUploading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("internProfileId", internProfileId);
      formData.append("documentType", documentType);

      const response = await documentApi.uploadDocument(formData);

      if (!response.success) {
        setErrorMessage(response.message || "Upload tài liệu thất bại");
        return;
      }

      setSuccessMessage("Upload tài liệu thành công!");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      if (onUploaded) {
        onUploaded(response.data);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Upload tài liệu thất bại"
      );
    } finally {
      setUploading(false);
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="document-upload-card">
      <h3 className="upload-card-title">Upload tài liệu</h3>
      <p className="helper-text">
        Chỉ hỗ trợ file PDF, DOC, DOCX. Dung lượng tối đa 5MB/file.
      </p>

      {errorMessage && <div className="alert alert--error">{errorMessage}</div>}
      {successMessage && <div className="alert alert--success">{successMessage}</div>}

      <form onSubmit={handleUpload} className="upload-form">
        <div className="form-group">
          <label className="form-label">Loại tài liệu</label>
          <select
            className="form-select"
            value={documentType}
            onChange={(event) => setDocumentType(event.target.value)}
          >
            <option value="CV">CV</option>
            <option value="APPLICATION_LETTER">Đơn xin thực tập</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Chọn file tài liệu</label>
          <input
            ref={fileInputRef}
            className="hidden-file-input"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          
          <div
            className={`dropzone-container ${isDragOver ? "drag-over" : ""} ${
              selectedFile ? "has-file" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <div className="dropzone-content">
              <span className="dropzone-icon">
                {selectedFile ? "📄" : "☁️"}
              </span>
              <p className="dropzone-text">
                {selectedFile ? (
                  <strong>{selectedFile.name}</strong>
                ) : (
                  <>
                    Kéo thả file vào đây hoặc <span className="browse-link">chọn file</span>
                  </>
                )}
              </p>
              {selectedFile && (
                <span className="file-size-info">
                  ({(selectedFile.size / 1024).toFixed(1)} KB)
                </span>
              )}
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={uploading || !selectedFile || !internProfileId}
          className="upload-submit-btn"
        >
          {uploading ? (
            <>
              <span className="btn-loading-spinner" />
              Đang upload...
            </>
          ) : (
            "Bắt đầu upload"
          )}
        </Button>
      </form>
    </div>
  );
}

export default DocumentUpload;
