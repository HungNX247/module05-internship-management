import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import InternProfileForm from "../../components/intern/InternProfileForm";
import DocumentUpload from "../../components/intern/DocumentUpload";
import DocumentList from "../../components/intern/DocumentList";
import { internApi } from "../../api/internApi";
import { documentApi } from "../../api/documentApi";
import { getApiErrorMessage } from "../../utils/apiErrorMessage";
import { mapDocuments } from "../../utils/mapDocument";
import "../../styles/intern-profile.css";

const STATUS_LABEL = {
  DRAFT: "Bản nháp",
  PENDING: "Chờ HR/Admin duyệt",
  SUBMITTED: "Đã duyệt",
  APPROVED: "Đã duyệt",
  REJECTED: "Bị từ chối",
};

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

  const loadDocuments = useCallback(async (profileId) => {
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
  }, []);

  const loadProfile = useCallback(async () => {
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
        setDocuments([]);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setProfile(null);
        setFormData(null);
        setDocuments([]);
        setErrorMessage("");
        return;
      }
      setErrorMessage(getApiErrorMessage(error, "Không tải được hồ sơ"));
    } finally {
      setLoading(false);
    }
  }, [loadDocuments]);

  useEffect(() => {
    let isMounted = true;
    const fetchInitialData = async () => {
      await Promise.resolve();
      if (isMounted) {
        loadProfile();
      }
    };
    fetchInitialData();
    return () => {
      isMounted = false;
    };
  }, [loadProfile]);

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
      setErrorMessage(getApiErrorMessage(error, "Cập nhật hồ sơ thất bại"));
    } finally {
      setSaving(false);
    }
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

  const isLocked = profile?.status && profile.status !== "DRAFT" && profile.status !== "REJECTED";

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

        {profile?.status === "REJECTED" && profile?.rejectReason && (
          <div className="alert alert--error" style={{ marginBottom: "20px" }}>
            ❌ <strong>Hồ sơ bị từ chối:</strong> {profile.rejectReason}. Bạn vui lòng chỉnh sửa lại thông tin và tải lại tài liệu (nếu cần), sau đó gửi lại hồ sơ.
          </div>
        )}

        {!profile || !formData ? (
          <div className="empty-state-container">
            <div className="empty-profile-card">
              <span className="empty-profile-icon">📝</span>
              <h3>Bạn chưa tạo hồ sơ thực tập</h3>
              <p>
                Hồ sơ của bạn giúp HR và người hướng dẫn đánh giá năng lực của bạn.
              </p>
              <Link to="/intern/apply" className="create-profile-btn">
                Tạo hồ sơ ứng tuyển ngay
              </Link>
            </div>
          </div>
        ) : (
          <div className="intern-page-grid">
            <div className="intern-card">
              <div className="card-header-flex">
                <h3 className="card-section-title">Thông tin học tập</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span className={`status-badge-val status--${profile.status.toLowerCase()}`}>
                    {STATUS_LABEL[profile.status] || profile.status}
                  </span>
                </div>
              </div>

              {isLocked && (
                <div className="info-lock-banner">
                  🔒 Hồ sơ đã nộp không thể chỉnh sửa thông tin. Trạng thái hiện tại: {STATUS_LABEL[profile.status] || profile.status}.
                </div>
              )}

              <InternProfileForm
                formData={formData}
                errors={errors}
                loading={saving}
                submitLabel="Cập nhật thông tin"
                onChange={handleChange}
                onSubmit={handleUpdateProfile}
                disabled={isLocked}
              />
            </div>

            <div className="intern-card">
              {isLocked ? (
                <div className="upload-disabled-box">
                  <span className="lock-icon">🔒</span>
                  <p>Hồ sơ đã nộp nên không thể tải thêm tài liệu.</p>
                </div>
              ) : (
                <DocumentUpload
                  internProfileId={profile.id}
                  onUploaded={() => loadDocuments(profile.id)}
                />
              )}

              <div className="uploaded-list-section" style={{ marginTop: "24px" }}>
                <h3 className="card-section-title">Danh sách tài liệu đã nộp</h3>
                <DocumentList documents={documents} />
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default InternProfilePage;
