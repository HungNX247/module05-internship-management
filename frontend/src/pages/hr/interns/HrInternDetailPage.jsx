import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, RejectReasonModal } from "../../../components/common";
import DocumentList from "../../../components/intern/DocumentList";
import { internApi } from "../../../api/internApi";
import { documentApi } from "../../../api/documentApi";
import { contractApi } from "../../../api/contractApi";
import ContractUpload from "../../../components/contract/ContractUpload";
import ContractInfoCard from "../../../components/contract/ContractInfoCard";
import { isHrInternMockEnabled } from "../../../mocks/hrInternMock";
import { getApiErrorMessage } from "../../../utils/apiErrorMessage";
import { mapDocuments } from "../../../utils/mapDocument";
import MainLayout from "../../../layouts/MainLayout";
import "../../../styles/hr-intern.css";
import "../../../styles/approval-contract.css";

const STATUS_BADGE = {
  DRAFT: "badge--draft",
  SUBMITTED: "badge--submitted",
  PENDING: "badge--pending",
  APPROVED: "badge--active",
  REJECTED: "badge--inactive",
};

const STATUS_LABEL = {
  DRAFT: "Bản nháp",
  SUBMITTED: "Đã nộp",
  PENDING: "Chờ duyệt",
  APPROVED: "Đã duyệt",
  REJECTED: "Đã từ chối",
};

function HrInternDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [intern, setIntern] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function loadContract(profileId) {
    try {
      const response = await contractApi.getContractByInternProfileId(profileId);
      if (response.success) {
        setContract(response.data);
      }
    } catch {
      setContract(null);
    }
  }

  async function loadDetail() {
    try {
      setLoading(true);
      setErrorMessage("");

      const [profileResponse, documentResponse] = await Promise.all([
        internApi.getInternById(id),
        documentApi.getDocumentsByInternId(id),
      ]);

      if (!profileResponse.success) {
        setErrorMessage(
          profileResponse.message || "Không tải được hồ sơ thực tập sinh"
        );
        return;
      }

      setIntern(profileResponse.data || null);

      if (documentResponse.success) {
        const documentData = documentResponse.data;
        const raw = Array.isArray(documentData)
          ? documentData
          : documentData?.items || [];
        setDocuments(mapDocuments(raw));
      } else {
        setDocuments([]);
      }

      if (profileResponse.data) {
        await loadContract(id);
      }
    } catch (error) {
      setIntern(null);
      setDocuments([]);
      setErrorMessage(
        getApiErrorMessage(
          error,
          "Không tải được chi tiết hồ sơ. Vui lòng thử lại."
        )
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDetail();
  }, [id]);

  async function handleApprove() {
    if (!window.confirm("Xác nhận duyệt hồ sơ này?")) return;
    try {
      setReviewing(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await internApi.approveProfile(id);
      if (!response.success) {
        setErrorMessage(response.message || "Duyệt hồ sơ thất bại");
        return;
      }

      setIntern(response.data);
      setSuccessMessage("Đã duyệt hồ sơ thực tập sinh.");
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Duyệt hồ sơ thất bại"));
    } finally {
      setReviewing(false);
    }
  }

  async function handleReject(rejectReason) {
    try {
      setReviewing(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await internApi.rejectProfile(id, rejectReason);
      if (!response.success) {
        setErrorMessage(response.message || "Từ chối hồ sơ thất bại");
        return;
      }

      setIntern(response.data);
      setRejectModalOpen(false);
      setSuccessMessage("Đã từ chối hồ sơ. Thực tập sinh có thể chỉnh sửa và nộp lại.");
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Từ chối hồ sơ thất bại"));
    } finally {
      setReviewing(false);
    }
  }

  return (
    <MainLayout>
      <div className="hr-intern-page">
        <div className="hr-intern-header">
          <div>
            <h2 className="hr-intern-title">Chi tiết hồ sơ thực tập sinh</h2>
            <p className="hr-intern-subtitle">
              Xem thông tin hồ sơ và tài liệu thực tập sinh đã tải lên
            </p>
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/hr/interns")}
          >
            Quay lại danh sách
          </Button>
        </div>

        {isHrInternMockEnabled && (
          <div className="alert alert--success">
            Đang dùng dữ liệu mock (VITE_HR_INTERN_MOCK=true). Tắt khi tích hợp API
            thật.
          </div>
        )}

        {errorMessage && (
          <div className="alert alert--error">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="alert alert--success">{successMessage}</div>
        )}

        {loading ? (
          <div className="loading-state">
            <span className="loading-spinner" />
            Đang tải chi tiết hồ sơ...
          </div>
        ) : intern ? (
          <>
            <div className="hr-intern-detail-grid">
              <div className="hr-intern-detail-card">
                <div className="hr-intern-detail-card__header">
                  <h3>Thông tin hồ sơ</h3>
                  <span
                    className={`badge ${STATUS_BADGE[intern.status] || "badge--draft"}`}
                  >
                    {STATUS_LABEL[intern.status] || intern.status || "-"}
                  </span>
                </div>

                {intern.status === "PENDING" && (
                  <div className="intern-profile-actions" style={{ marginBottom: "20px" }}>
                    <Button
                      type="button"
                      variant="primary"
                      disabled={reviewing}
                      onClick={handleApprove}
                    >
                      {reviewing ? "Đang xử lý..." : "✓ Duyệt hồ sơ"}
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      disabled={reviewing}
                      onClick={() => setRejectModalOpen(true)}
                    >
                      ✗ Từ chối
                    </Button>
                  </div>
                )}

                <div className="detail-list">
                  <div className="detail-row">
                    <span>Họ tên</span>
                    <strong>{intern.fullName || "-"}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Email</span>
                    <strong>{intern.email || "-"}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Số điện thoại</span>
                    <strong>{intern.phone || "-"}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Trường</span>
                    <strong>{intern.school || "-"}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Ngành</span>
                    <strong>{intern.major || "-"}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Năm học</span>
                    <strong>{intern.academicYear || "-"}</strong>
                  </div>
                  <div className="detail-row">
                    <span>GPA</span>
                    <strong>{intern.gpa ?? "-"}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Ngày tạo</span>
                    <strong>{intern.createdAt || "-"}</strong>
                  </div>
                  {intern.rejectReason && (
                    <div className="detail-row" style={{ borderBottom: "none" }}>
                      <span style={{ color: "var(--color-danger)", fontWeight: "600" }}>Lý do từ chối</span>
                      <strong style={{ color: "var(--color-danger)" }}>{intern.rejectReason}</strong>
                    </div>
                  )}
                </div>
              </div>

              <div className="hr-intern-detail-card">
                <div className="hr-intern-detail-card__header">
                  <h3>Tài liệu đã tải lên</h3>
                </div>

                <DocumentList documents={documents} />
              </div>
            </div>

            {(intern.status === "APPROVED" || intern.status === "SUBMITTED" || contract) && (
              <div className="hr-intern-detail-grid" style={{ marginTop: "24px" }}>
                <ContractUpload
                  internProfileId={intern.id}
                  disabled={intern.status !== "APPROVED" && intern.status !== "SUBMITTED"}
                  onUploaded={(uploadedContract) => setContract(uploadedContract)}
                />
                <ContractInfoCard contract={contract} showConfirm={false} />
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-state__icon">⚠️</div>
            <p className="empty-state__title">Không tìm thấy hồ sơ</p>
            <p className="empty-state__desc">
              Hồ sơ không tồn tại hoặc bạn không có quyền xem.
            </p>
          </div>
        )}

        <RejectReasonModal
          open={rejectModalOpen}
          loading={reviewing}
          onClose={() => setRejectModalOpen(false)}
          onConfirm={handleReject}
        />
      </div>
    </MainLayout>
  );
}

export default HrInternDetailPage;
