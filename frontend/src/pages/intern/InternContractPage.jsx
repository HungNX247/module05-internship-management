import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { contractApi } from "../../api/contractApi";
import { internApi } from "../../api/internApi";
import ContractInfoCard from "../../components/contract/ContractInfoCard";
import "../../styles/approval-contract.css";

function InternContractPage() {
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function loadMyContract() {
    try {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await contractApi.getMyContract();
        if (response && response.success) {
          setContract(response.data);
          return;
        }
      } catch (err) {
        console.warn("Direct /contracts/me failed, trying profile-based fallback...", err);
      }

      const profileRes = await internApi.getMyProfile();
      if (profileRes && profileRes.success && profileRes.data) {
        const profileId = profileRes.data.id;
        const contractRes = await contractApi.getContractByInternProfileId(profileId);
        if (contractRes && contractRes.success) {
          setContract(contractRes.data);
        } else {
          setContract(null);
        }
      } else {
        setErrorMessage("Không tải được thông tin hồ sơ của bạn để lấy hợp đồng.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || error.message || "Không tải được thông tin hợp đồng"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMyContract();
  }, []);

  async function handleConfirmContract(contractId) {
    if (!window.confirm("Bạn có chắc chắn muốn xác nhận đồng ý với điều khoản hợp đồng thực tập này?")) {
      return;
    }

    try {
      setConfirming(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await contractApi.confirmContract(contractId);
      if (!response.success) {
        setErrorMessage(response.message || "Xác nhận hợp đồng thất bại");
        return;
      }

      setContract(response.data);
      setSuccessMessage("Xác nhận ký kết hợp đồng thực tập thành công! Chúc mừng bạn.");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || error.message || "Xác nhận hợp đồng thất bại"
      );
    } finally {
      setConfirming(false);
    }
  }

  return (
    <MainLayout>
      <div className="intern-page contract-page" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div className="page-header" style={{ marginBottom: "24px" }}>
          <h2 className="page-header__title" style={{ fontSize: "26px", fontWeight: "700", margin: "0 0 8px 0" }}>
            📝 Hợp đồng thực tập
          </h2>
          <p className="page-header__subtitle" style={{ color: "var(--color-text-muted)", margin: 0, fontSize: "14px" }}>
            Xem và ký xác nhận hợp đồng sau khi hồ sơ ứng tuyển của bạn đã được HR duyệt thông qua.
          </p>
        </div>

        {errorMessage && <div className="intern-message-error">⚠️ {errorMessage}</div>}
        {successMessage && <div className="intern-message-success">✓ {successMessage}</div>}

        {loading ? (
          <div className="loading-state">
            <span className="loading-spinner" />
            Đang tải thông tin hợp đồng...
          </div>
        ) : (
          <ContractInfoCard
            contract={contract}
            showConfirm={true}
            confirming={confirming}
            onConfirm={handleConfirmContract}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default InternContractPage;
