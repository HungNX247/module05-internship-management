import { useState } from "react";
import { Button } from "../common";
import { contractApi } from "../../api/contractApi";

async function fetchContractBlob(contractId) {
  return contractApi.downloadContract(contractId);
}

function ContractInfoCard({ contract, showConfirm, confirming, onConfirm }) {
  const [downloadError, setDownloadError] = useState("");
  const [downloading, setDownloading] = useState(false);

  if (!contract) {
    return <div className="empty-state">Chưa có hợp đồng được upload.</div>;
  }

  const fileName = contract.fileName || contract.originalFileName || "hop-dong-thuc-tap.pdf";
  const status = contract.status || "UPLOADED";

  async function handleOpenContract() {
    try {
      setDownloading(true);
      setDownloadError("");
      const blob = await fetchContractBlob(contract.id);
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (error) {
      setDownloadError(
        error.response?.data?.message || error.message || "Không tải được hợp đồng"
      );
    } finally {
      setDownloading(false);
    }
  }

  async function handleSaveContract() {
    try {
      setDownloading(true);
      setDownloadError("");
      const blob = await fetchContractBlob(contract.id);
      const url = URL.createObjectURL(blob);
      const link = window.document.createElement("a");
      link.href = url;
      link.download = fileName;
      window.document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      setDownloadError(
        error.response?.data?.message || error.message || "Không tải được hợp đồng"
      );
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="contract-info-card">
      <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "18px" }}>
        Thông tin hợp đồng
      </h3>

      {downloadError && <div className="intern-message-error">{downloadError}</div>}

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
        {contract.id && (
          <>
            <Button
              type="button"
              variant="secondary"
              disabled={downloading}
              onClick={handleOpenContract}
            >
              {downloading ? "Đang tải..." : "Xem hợp đồng"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={downloading}
              onClick={handleSaveContract}
            >
              {downloading ? "Đang tải..." : "Tải hợp đồng"}
            </Button>
          </>
        )}

        {showConfirm && status !== "CONFIRMED" && (
          <Button
            type="button"
            disabled={confirming || !contract.id}
            onClick={() => onConfirm(contract.id)}
            variant="primary"
          >
            {confirming ? "Đang xác nhận..." : "Xác nhận hợp đồng"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ContractInfoCard;
