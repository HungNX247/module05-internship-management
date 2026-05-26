import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import InternProfileForm from "../../components/intern/InternProfileForm";
import DocumentUpload from "../../components/intern/DocumentUpload";
import { Button } from "../../components/common";
import { internApi } from "../../api/internApi";
import { documentApi } from "../../api/documentApi";
import { isHrInternMockEnabled } from "../../mocks/hrInternMock";
import { getApiErrorMessage } from "../../utils/apiErrorMessage";
import { mapDocuments } from "../../utils/mapDocument";
import "../../styles/intern-profile.css";

const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  school: "",
  major: "",
  academicYear: "",
  gpa: "",
};

function validateProfileForm(formData) {
  const nextErrors = {};

  if (!formData.fullName.trim()) nextErrors.fullName = "Vui lòng nhập họ tên";
  if (!formData.email.trim()) nextErrors.email = "Vui lòng nhập email";
  else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
    nextErrors.email = "Email không đúng định dạng";
  }

  if (!formData.phone.trim()) nextErrors.phone = "Vui lòng nhập số điện thoại";
  else if (!/^\d{10}$/.test(formData.phone.trim())) {
    nextErrors.phone = "Số điện thoại phải gồm 10 chữ số";
  }

  if (!formData.school.trim()) nextErrors.school = "Vui lòng nhập trường học";
  if (!formData.major.trim()) nextErrors.major = "Vui lòng nhập ngành học";
  if (!formData.academicYear.trim()) nextErrors.academicYear = "Vui lòng nhập năm học";

  if (formData.gpa !== "") {
    const gpaValue = Number(formData.gpa);
    if (Number.isNaN(gpaValue) || gpaValue < 0 || gpaValue > 4) {
      nextErrors.gpa = "GPA phải nằm trong khoảng 0.0 đến 4.0";
    }
  }

  return nextErrors;
}

function buildProfilePayload(formData) {
  return {
    fullName: formData.fullName.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    school: formData.school.trim(),
    major: formData.major.trim(),
    academicYear: formData.academicYear.trim(),
    gpa: formData.gpa === "" ? null : Number(formData.gpa),
  };
}

function toFormData(profile) {
  return {
    fullName: profile.fullName || "",
    email: profile.email || "",
    phone: profile.phone || "",
    school: profile.school || "",
    major: profile.major || "",
    academicYear: profile.academicYear || "",
    gpa: profile.gpa ?? "",
  };
}

function InternApplyPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [profile, setProfile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Load existing profile if any
  async function loadExistingProfile() {
    try {
      setFetching(true);
      setApiError("");
      const response = await internApi.getMyProfile();
      if (response.success && response.data) {
        setProfile(response.data);
        setFormData(toFormData(response.data));
        await loadDocuments(response.data.id);
      }
    } catch (error) {
      // Don't show error if it's just that the profile doesn't exist yet
      if (error.response?.status !== 404) {
        setApiError(getApiErrorMessage(error, "Không thể tải thông tin hồ sơ hiện tại."));
      }
    } finally {
      setFetching(false);
    }
  }

  async function loadDocuments(profileId) {
    if (!profileId) return;
    try {
      const response = await documentApi.getDocumentsByInternProfileId(profileId);
      if (response.success) {
        const raw = Array.isArray(response.data)
          ? response.data
          : response.data?.items || [];
        setDocuments(mapDocuments(raw));
      }
    } catch {
      setDocuments([]);
    }
  }

  useEffect(() => {
    loadExistingProfile();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError("");
    setSuccessMessage("");
  }

  async function handleCreateProfile(event) {
    event.preventDefault();

    const nextErrors = validateProfileForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    try {
      setLoading(true);
      setApiError("");
      setSuccessMessage("");

      let response;
      if (profile?.id) {
        response = await internApi.updateProfile(profile.id, buildProfilePayload(formData));
      } else {
        response = await internApi.createProfile(buildProfilePayload(formData));
      }

      if (!response.success) {
        setApiError(response.message || "Lưu hồ sơ thất bại");
        return;
      }

      setProfile(response.data);
      setSuccessMessage("Đã lưu thông tin hồ sơ thành công! Hãy tiếp tục upload tài liệu.");
      await loadDocuments(response.data.id);
    } catch (error) {
      setApiError(getApiErrorMessage(error, "Lưu hồ sơ thất bại"));
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitProfile() {
    if (!profile?.id) {
      setApiError("Cần tạo hồ sơ trước khi nộp");
      return;
    }

    const hasCV = documents.some((d) => d.documentType === "CV");
    if (!hasCV) {
      setApiError("Vui lòng upload CV của bạn trước khi nộp hồ sơ!");
      return;
    }

    try {
      setSubmitting(true);
      setApiError("");
      setSuccessMessage("");

      const response = await internApi.submitProfile(profile.id);

      if (!response.success) {
        setApiError(response.message || "Nộp hồ sơ thất bại");
        return;
      }

      setProfile(response.data);
      setSuccessMessage("Nộp hồ sơ thực tập thành công! HR sẽ sớm xét duyệt hồ sơ của bạn.");
    } catch (error) {
      setApiError(getApiErrorMessage(error, "Nộp hồ sơ thất bại"));
    } finally {
      setSubmitting(false);
    }
  }

  function handleResetMockProfile() {
    if (!profile?.id) return;

    const stored = localStorage.getItem("MOCK_INTERNS");
    if (stored) {
      const list = JSON.parse(stored);
      const updated = list.filter((i) => String(i.id) !== String(profile.id));
      localStorage.setItem("MOCK_INTERNS", JSON.stringify(updated));
    }

    const storedDocs = localStorage.getItem("MOCK_DOCUMENTS");
    if (storedDocs) {
      const docs = JSON.parse(storedDocs);
      delete docs[profile.id];
      localStorage.setItem("MOCK_DOCUMENTS", JSON.stringify(docs));
    }

    setProfile(null);
    setFormData(initialFormData);
    setDocuments([]);
    setErrors({});
    setSuccessMessage("Đã reset hồ sơ mock thành công. Bạn có thể test lại từ đầu.");
    setApiError("");
  }

  if (fetching) {
    return (
      <MainLayout>
        <div className="loading-state">
          <span className="loading-spinner" />
          Đang tải thông tin hồ sơ...
        </div>
      </MainLayout>
    );
  }

  const currentStep = !profile ? 1 : (profile.status === "DRAFT" ? 2 : 3);

  return (
    <MainLayout>
      <div className="intern-page">
        <div className="page-header">
          <h2 className="page-header__title">Nộp hồ sơ thực tập</h2>
          <p className="page-header__subtitle">
            Cung cấp thông tin chi tiết, đính kèm CV và gửi hồ sơ ứng tuyển của bạn.
          </p>
        </div>

        <div className="application-steps">
          <div className={`step-item ${currentStep >= 1 ? "active" : ""} ${currentStep > 1 ? "completed" : ""}`}>
            <span className="step-num">{currentStep > 1 ? "✓" : "1"}</span>
            <span className="step-label">Thông tin cá nhân</span>
          </div>
          <div className="step-divider" />
          <div className={`step-item ${currentStep >= 2 ? "active" : ""} ${currentStep > 2 ? "completed" : ""}`}>
            <span className="step-num">{currentStep > 2 ? "✓" : "2"}</span>
            <span className="step-label">Upload CV/Tài liệu</span>
          </div>
          <div className="step-divider" />
          <div className={`step-item ${currentStep === 3 ? "active completed" : ""}`}>
            <span className="step-num">3</span>
            <span className="step-label">Nộp hồ sơ</span>
          </div>
        </div>

        {apiError && <div className="alert alert--error">{apiError}</div>}
        {successMessage && <div className="alert alert--success">{successMessage}</div>}

        <div className="intern-page-grid">
          {/* Column 1: Profile Form */}
          <div className="intern-card">
            <h3 className="card-section-title">Thông tin hồ sơ</h3>
            {profile?.status === "SUBMITTED" ? (
              <div className="submitted-view">
                <div className="detail-list">
                  <div className="detail-row">
                    <span>Họ tên</span>
                    <strong>{formData.fullName}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Email</span>
                    <strong>{formData.email}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Số điện thoại</span>
                    <strong>{formData.phone}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Trường học</span>
                    <strong>{formData.school}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Ngành học</span>
                    <strong>{formData.major}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Năm học</span>
                    <strong>{formData.academicYear}</strong>
                  </div>
                  <div className="detail-row">
                    <span>GPA</span>
                    <strong>{formData.gpa || "Chưa cập nhật"}</strong>
                  </div>
                </div>
                <div className="info-badge-success">
                  🔒 Hồ sơ đã nộp thành công và đang được khóa để duyệt. Bạn có thể xem chi tiết tại tab "Hồ sơ của tôi".
                </div>
              </div>
            ) : (
              <InternProfileForm
                formData={formData}
                errors={errors}
                loading={loading}
                submitLabel={profile?.id ? "Cập nhật bản nháp" : "Tạo hồ sơ nháp"}
                onChange={handleChange}
                onSubmit={handleCreateProfile}
              />
            )}
          </div>

          {/* Column 2: Status & Upload documents */}
          <div className="intern-card">
            <h3 className="card-section-title">Trạng thái hồ sơ</h3>

            <div className="status-display-box">
              <span className="status-label">Trạng thái hiện tại:</span>
              <span className={`status-badge-val status--${profile?.status?.toLowerCase() || "none"}`}>
                {profile?.status === "SUBMITTED"
                  ? "Đã nộp"
                  : profile?.status === "DRAFT"
                    ? "Bản nháp"
                    : "Chưa tạo hồ sơ"}
              </span>
            </div>

            {isHrInternMockEnabled && profile && (
              <button
                type="button"
                onClick={handleResetMockProfile}
                style={{
                  width: "100%",
                  marginTop: "-10px",
                  marginBottom: "20px",
                  padding: "10px",
                  background: "#fee2e2",
                  color: "#dc2626",
                  border: "1px solid #fecaca",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "#fca5a5"}
                onMouseOut={(e) => e.currentTarget.style.background = "#fee2e2"}
              >
                🗑️ Reset/Xóa hồ sơ để test lại
              </button>
            )}

            {profile?.status !== "SUBMITTED" ? (
              <DocumentUpload
                internProfileId={profile?.id}
                onUploaded={() => loadDocuments(profile.id)}
              />
            ) : (
              <div className="upload-disabled-box">
                <span className="lock-icon">🔒</span>
                <p>Không thể upload thêm tài liệu sau khi đã nộp hồ sơ.</p>
              </div>
            )}

            <div className="uploaded-list-section">
              <h4 className="sub-section-title">Tài liệu đã đính kèm</h4>
              {documents.length === 0 ? (
                <p className="no-docs-text">Chưa đính kèm tài liệu nào. (Yêu cầu ít nhất 1 file CV)</p>
              ) : (
                <ul className="doc-list-small">
                  {documents.map((doc) => (
                    <li key={doc.id} className="doc-item-small">
                      <div className="doc-info-col">
                        <span className="doc-icon-mini">📄</span>
                        <div className="doc-meta-mini">
                          <span className="doc-name-mini">{doc.fileName}</span>
                          <span className="doc-type-mini">
                            {doc.documentType === "CV" ? "CV ứng tuyển" : "Đơn xin thực tập"}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {profile?.status !== "SUBMITTED" && (
              <div className="submit-profile-box">
                <Button
                  type="button"
                  variant="primary"
                  className="full-width-btn"
                  disabled={!profile?.id || submitting || documents.length === 0}
                  onClick={handleSubmitProfile}
                >
                  {submitting ? "Đang gửi hồ sơ..." : "Nộp hồ sơ chính thức"}
                </Button>
                {!profile?.id && (
                  <p className="button-helper-warning">
                    * Bạn cần điền thông tin và lưu hồ sơ nháp trước.
                  </p>
                )}
                {profile?.id && documents.length === 0 && (
                  <p className="button-helper-warning">
                    * Bạn cần upload ít nhất một tài liệu CV để có thể nộp.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default InternApplyPage;
