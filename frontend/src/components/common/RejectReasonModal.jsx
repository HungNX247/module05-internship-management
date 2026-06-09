import { useState } from "react";
import Button from "./Button";

function RejectReasonModal({ open, loading, onClose, onConfirm }) {
  const [rejectReason, setRejectReason] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  function handleSubmit(event) {
    event.preventDefault();

    const reason = rejectReason.trim();
    if (!reason) {
      setError("Vui lòng nhập lý do từ chối");
      return;
    }

    if (reason.length > 500) {
      setError("Lý do từ chối không được vượt quá 500 ký tự");
      return;
    }

    onConfirm(reason);
  }

  function handleClose() {
    if (loading) return;
    setRejectReason("");
    setError("");
    onClose();
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-card reject-modal">
        <div className="modal-header">
          <h3>Từ chối hồ sơ</h3>
          <button type="button" className="modal-close" onClick={handleClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <p className="helper-text">
            Vui lòng nhập lý do từ chối để thực tập sinh biết cần bổ sung/chỉnh sửa gì.
          </p>

          <textarea
            className={`reject-reason-textarea ${error ? "form-input-error" : ""}`}
            rows="5"
            value={rejectReason}
            maxLength={500}
            placeholder="VD: CV chưa đúng định dạng, thiếu thông tin trường/ngành..."
            onChange={(event) => {
              setRejectReason(event.target.value);
              setError("");
            }}
          />

          <div className="textarea-counter">{rejectReason.length}/500</div>
          {error && <div className="form-error">{error}</div>}

          <div className="modal-actions">
            <Button type="button" variant="secondary" onClick={handleClose} disabled={loading}>
              Hủy
            </Button>
            <Button type="submit" variant="danger" disabled={loading}>
              {loading ? "Đang xử lý..." : "Xác nhận từ chối"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RejectReasonModal;
