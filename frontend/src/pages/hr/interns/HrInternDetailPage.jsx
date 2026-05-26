import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../../../components/common";
import DocumentList from "../../../components/intern/DocumentList";
import { internApi } from "../../../api/internApi";
import { documentApi } from "../../../api/documentApi";
import { isHrInternMockEnabled } from "../../../mocks/hrInternMock";
import { getApiErrorMessage } from "../../../utils/apiErrorMessage";
import { mapDocuments } from "../../../utils/mapDocument";
import MainLayout from "../../../layouts/MainLayout";
import "../../../styles/hr-intern.css";

const STATUS_BADGE = {
  DRAFT: "badge--draft",
  SUBMITTED: "badge--submitted",
  PENDING: "badge--pending",
};

function HrInternDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [intern, setIntern] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
          profileResponse.message || "Không tải được hồ sơ intern"
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

  return (
    <MainLayout>
      <div className="hr-intern-page">
        <div className="hr-intern-header">
          <div>
            <h2 className="hr-intern-title">Chi tiết hồ sơ intern</h2>
            <p className="hr-intern-subtitle">
              Xem thông tin hồ sơ và tài liệu intern đã upload
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

        {loading ? (
          <div className="loading-state">
            <span className="loading-spinner" />
            Đang tải chi tiết hồ sơ...
          </div>
        ) : intern ? (
          <div className="hr-intern-detail-grid">
            <div className="hr-intern-detail-card">
              <div className="hr-intern-detail-card__header">
                <h3>Thông tin hồ sơ</h3>
                <span
                  className={`badge ${STATUS_BADGE[intern.status] || "badge--draft"}`}
                >
                  {intern.status || "-"}
                </span>
              </div>

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
                  <span>Phone</span>
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
              </div>
            </div>

            <div className="hr-intern-detail-card">
              <div className="hr-intern-detail-card__header">
                <h3>Tài liệu đã upload</h3>
              </div>

              <DocumentList documents={documents} />
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state__icon">⚠️</div>
            <p className="empty-state__title">Không tìm thấy hồ sơ</p>
            <p className="empty-state__desc">
              Hồ sơ không tồn tại hoặc bạn không có quyền xem.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default HrInternDetailPage;
