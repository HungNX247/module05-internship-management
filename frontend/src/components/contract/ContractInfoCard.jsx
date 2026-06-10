import { Button } from "../common";
import { contractApi } from "../../api/contractApi";

function ContractInfoCard({ contract, showConfirm, confirming, onConfirm }) {
  if (!contract) {
    return <div className="empty-state">Chưa có hợp đồng được upload.</div>;
  }

  const fileName = contract.fileName || contract.originalFileName || "Hop_dong_thuc_tap.pdf";
  const status = contract.status || "UPLOADED";
  const downloadUrl = contract.id ? contractApi.getDownloadUrl(contract.id) : null;

  return (
    <div className="contract-info-card">
      <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "18px" }}>Thông tin hợp đồng</h3>
      
      <div className="contract-info-rows">
        <div className="contract-info-row">
          <span>Tên file</span>
          <strong>{fileName}</strong>
        </div>
        <div className="contract-info-row">
          <span>Trạng thái</span>
          <span className={`contract-status-badge contract-status-badge--${status.toLowerCase()}`}>
            {status === "CONFIRMED" ? "Đã xác nhận" : "Chờ xác nhận"}
          </span>
        </div>
        {contract.uploadedAt && (
          <div className="contract-info-row">
            <span>Ngày upload</span>
            <strong>{new Date(contract.uploadedAt).toLocaleString("vi-VN")}</strong>
          </div>
        )}
        {contract.confirmedAt && (
          <div className="contract-info-row">
            <span>Ngày xác nhận</span>
            <strong>{new Date(contract.confirmedAt).toLocaleString("vi-VN")}</strong>
          </div>
        )}
      </div>

      <div className="contract-actions">
        {downloadUrl && (
          <a
            className="btn btn-secondary"
            href={downloadUrl}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            📥 Xem & Tải hợp đồng
          </a>
        )}

        {showConfirm && status !== "CONFIRMED" && (
          <Button type="button" disabled={confirming} onClick={() => onConfirm(contract.id)} variant="primary">
            {confirming ? "Đang xác nhận..." : "✍️ Xác nhận hợp đồng"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ContractInfoCard;
