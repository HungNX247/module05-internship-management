import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import InternProfileForm from "../../components/intern/InternProfileForm";
import DocumentUpload from "../../components/intern/DocumentUpload";
import { internApi } from "../../api/internApi";
import { documentApi } from "../../api/documentApi";
import { isHrInternMockEnabled } from "../../mocks/hrInternMock";
import "../../styles/intern-profile.css";

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

function InternProfilePage() {
  const [profile, setProfile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function loadProfile() {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await internApi.getMyProfile();

      if (!response.success) {
        setErrorMessage(response.message || "Không tải được hồ sơ");
        return;
      }

      if (response.data) {
        setProfile(response.data);
        setFormData(toFormData(response.data));
        await loadDocuments(response.data.id);
      } else {
        setProfile(null);
        setFormData(null);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
        error.message ||
        "Không tải được hồ sơ"
      );
    } finally {
      setLoading(false);
    }
  }

  async function loadDocuments(profileId) {
    if (!profileId) return;

    try {
      const response = await documentApi.getDocumentsByInternProfileId(profileId);
      if (response.success) {
        setDocuments(response.data || []);
      }
    } catch {
      setDocuments([]);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setErrorMessage("");
    setSuccessMessage("");
  }

  async function handleUpdateProfile(event) {
    event.preventDefault();

    const nextErrors = validateProfileForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    try {
      setSaving(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await internApi.updateProfile(
        profile.id,
        buildProfilePayload(formData)
      );

      if (!response.success) {
        setErrorMessage(response.message || "Cập nhật hồ sơ thất bại");
        return;
      }

      setProfile(response.data);
      setFormData(toFormData(response.data));
      setSuccessMessage("Cập nhật hồ sơ thành công");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
        error.message ||
        "Cập nhật hồ sơ thất bại"
      );
    } finally {
      setSaving(false);
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
    setFormData(null);
    setDocuments([]);
    setErrors({});
    setSuccessMessage("Đã reset hồ sơ mock thành công. Bạn có thể test lại từ đầu.");
    setErrorMessage("");
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="loading-state">
          <span className="loading-spinner" />
          Đang tải hồ sơ...
        </div>
      </MainLayout>
    );
  }

  const isSubmitted = profile?.status === "SUBMITTED";

  return (
    <MainLayout>
      <div className="intern-page">
        <div className="page-header">
          <h2 className="page-header__title">Hồ sơ cá nhân</h2>
          <p className="page-header__subtitle">
            Quản lý thông tin hồ sơ học tập và các tài liệu đính kèm của bạn.
          </p>
        </div>

        {errorMessage && <div className="alert alert--error">{errorMessage}</div>}
        {successMessage && <div className="alert alert--success">{successMessage}</div>}

        {!profile || !formData ? (
          <div className="empty-state-container">
            <div className="empty-profile-card">
              <span className="empty-profile-icon">📝</span>
              <h3>Bạn chưa tạo hồ sơ thực tập</h3>
              <p>Hồ sơ của bạn giúp HR và người hướng dẫn đánh giá năng lực của bạn.</p>
              <Link to="/intern/apply" className="create-profile-btn">
                Tạo hồ sơ ứng tuyển ngay
              </Link>
            </div>
          </div>
        ) : (
          <div className="intern-page-grid">
            {/* Column 1: Info */}
            <div className="intern-card">
              <div className="card-header-flex">
                <h3 className="card-section-title">Thông tin học tập</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {isHrInternMockEnabled && (
                    <button
                      type="button"
                      onClick={handleResetMockProfile}
                      style={{
                        padding: "5px 10px",
                        background: "#fee2e2",
                        color: "#dc2626",
                        border: "1px solid #fecaca",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                      title="Xóa hồ sơ này để test lại luồng ứng tuyển từ đầu"
                    >
                      🗑️ Reset
                    </button>
                  )}
                  <span className={`status-badge-val status--${profile.status.toLowerCase()}`}>
                    {profile.status === "SUBMITTED"
                      ? "Đã nộp"
                      : profile.status === "DRAFT"
                        ? "Bản nháp"
                        : profile.status}
                  </span>
                </div>
              </div>

              {isSubmitted && (
                <div className="info-lock-banner">
                  🔒 Hồ sơ đã nộp không thể chỉnh sửa thông tin.
                </div>
              )}

              <InternProfileForm
                formData={formData}
                errors={errors}
                loading={saving}
                submitLabel="Cập nhật thông tin"
                onChange={handleChange}
                onSubmit={handleUpdateProfile}
                disabled={isSubmitted}
              />
            </div>

            {/* Column 2: Documents list */}
            <div className="intern-card">
              {!isSubmitted ? (
                <DocumentUpload
                  internProfileId={profile.id}
                  onUploaded={() => loadDocuments(profile.id)}
                />
              ) : (
                <div className="lock-document-card">
                  <h3 className="upload-card-title">Upload tài liệu</h3>
                  <div className="upload-disabled-box">
                    <span className="lock-icon">🔒</span>
                    <p>Hồ sơ đã khóa. Không thể tải lên thêm tài liệu mới.</p>
                  </div>
                </div>
              )}

              <div className="uploaded-list-section" style={{ marginTop: "24px" }}>
                <h3 className="card-section-title">Danh sách tài liệu đã nộp</h3>
                {documents.length === 0 ? (
                  <p className="no-docs-text">Chưa có tài liệu nào.</p>
                ) : (
                  <ul className="document-list-main">
                    {documents.map((doc) => (
                      <li key={doc.id} className="document-list-item-main">
                        <div className="doc-item-left">
                          <span className="doc-type-badge">
                            {doc.documentType || "TÀI LIỆU"}
                          </span>
                          <div className="doc-details">
                            <span className="doc-file-name">{doc.fileName}</span>
                            <span className="doc-file-meta">
                              {doc.fileSize ? `${(doc.fileSize / 1024).toFixed(1)} KB` : ""} •{" "}
                              {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString("vi-VN") : ""}
                            </span>
                          </div>
                        </div>
                        <a
                          href={doc.fileUrl || "#"}
                          onClick={(e) => !doc.fileUrl && e.preventDefault()}
                          className={`download-doc-btn ${!doc.fileUrl ? "disabled" : ""}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Tải về
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default InternProfilePage;
