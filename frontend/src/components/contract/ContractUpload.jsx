import { useState, useRef } from "react";
import { Button } from "../common";
import { contractApi } from "../../api/contractApi";

const MAX_CONTRACT_SIZE = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx"];

function getFileExtension(fileName) {
  return fileName.split(".").pop()?.toLowerCase() || "";
}

function ContractUpload({ internProfileId, disabled, onUploaded }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);

  function validateFile(file) {
    if (!file) return "Vui lòng chọn file hợp đồng";

    const extension = getFileExtension(file.name);
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      return "Chỉ cho phép upload hợp đồng PDF, DOC, DOCX";
    }

    if (file.size > MAX_CONTRACT_SIZE) {
      return "File hợp đồng không được vượt quá 10MB";
    }

    return "";
  }

  function handleZoneClick() {
    if (disabled || uploading) return;
    fileInputRef.current?.click();
  }

  async function handleUpload(event) {
    event.preventDefault();

    if (!internProfileId) {
      setErrorMessage("Không tìm thấy hồ sơ thực tập sinh");
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

      const response = await contractApi.uploadContract(formData);

      if (!response.success) {
        setErrorMessage(response.message || "Upload hợp đồng thất bại");
        return;
      }

      setSuccessMessage("Upload hợp đồng thành công");
      setSelectedFile(null);

      if (onUploaded) onUploaded(response.data);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || error.message || "Upload hợp đồng thất bại"
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="contract-upload-card">
      <h3 style={{ marginTop: 0, marginBottom: "8px", fontSize: "18px" }}>Upload hợp đồng</h3>
      <p className="helper-text">Chỉ upload hợp đồng khi hồ sơ đã được APPROVED.</p>

      {errorMessage && <div className="intern-message-error">⚠️ {errorMessage}</div>}
      {successMessage && <div className="intern-message-success">✓ {successMessage}</div>}

      <form onSubmit={handleUpload}>
        <input
          type="file"
          ref={fileInputRef}
          accept=".pdf,.doc,.docx"
          disabled={disabled || uploading}
          style={{ display: "none" }}
          onChange={(event) => {
            const file = event.target.files?.[0] || null;
            setSelectedFile(file);
            setErrorMessage("");
            setSuccessMessage("");
          }}
        />

        <div
          className="upload-zone"
          onClick={handleZoneClick}
          style={{
            opacity: disabled || uploading ? 0.6 : 1,
            cursor: disabled || uploading ? "not-allowed" : "pointer"
          }}
        >
          <div className="upload-zone__icon">📤</div>
          <div className="upload-zone__text">
            {selectedFile ? "Thay đổi file hợp đồng" : "Nhấp để chọn file hợp đồng"}
          </div>
          <div className="upload-zone__subtext">PDF, DOC, DOCX (Tối đa 10MB)</div>
        </div>

        {selectedFile && (
          <div className="selected-file-name" style={{ marginBottom: "16px" }}>
            📄 File đã chọn: <strong>{selectedFile.name}</strong> ({Math.round(selectedFile.size / 1024)} KB)
          </div>
        )}

        <Button type="submit" disabled={disabled || uploading || !selectedFile} variant="primary">
          {uploading ? "Đang upload..." : "Upload hợp đồng"}
        </Button>
      </form>
    </div>
  );
}

export default ContractUpload;
