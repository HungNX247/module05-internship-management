import { useEffect, useRef, useState } from "react";

import { Button } from "../common";
import DocumentList from "./DocumentList";
import InternProfileForm, { emptyForm } from "./InternProfileForm";
import { internApi } from "../../api/internApi";
import { documentApi } from "../../api/documentApi";
import { isHrInternMockEnabled } from "../../mocks/hrInternMock";
import { getApiErrorMessage } from "../../utils/apiErrorMessage";
import { mapDocuments } from "../../utils/mapDocument";

function profileToForm(profile) {
  if (!profile) return { ...emptyForm };
  return {
    fullName: profile.fullName || "",
    email: profile.email || "",
    phone: profile.phone || "",
    school: profile.school || "",
    major: profile.major || "",
    academicYear: profile.academicYear || "",
    gpa: profile.gpa ?? "",
    birthDate: profile.birthDate || "",
  };
}

function InternProfileContent({ pageTitle, pageSubtitle }) {
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [noProfile, setNoProfile] = useState(false);
  const [formData, setFormData] = useState({ ...emptyForm });
  const [documents, setDocuments] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isDraft = !profile || profile.status === "DRAFT" || profile.status === "REJECTED";
  const formDisabled = Boolean(
    profile && profile.status !== "DRAFT" && profile.status !== "REJECTED"
  );

  async function loadDocuments(internId) {
    if (!internId) {
      setDocuments([]);
      return;
    }

    try {
      const response = await documentApi.getDocumentsByInternId(internId);
      if (response.success) {
        const raw = Array.isArray(response.data)
          ? response.data
          : response.data?.items || [];
        setDocuments(mapDocuments(raw));
      } else {
        setDocuments([]);
      }
    } catch {
      setDocuments([]);
    }
  }

  async function loadProfile() {
    try {
      setLoading(true);
      setApiError("");

      const response = await internApi.getMyProfile();
      const data = response?.data ?? null;

      if (!data) {
        setProfile(null);
        setNoProfile(true);
        setFormData({ ...emptyForm });
        setDocuments([]);
        return;
      }

      setProfile(data);
      setNoProfile(false);
      setFormData(profileToForm(data));
      await loadDocuments(data.id);
    } catch (error) {
      if (error?.response?.status === 404) {
        setProfile(null);
        setNoProfile(true);
        setFormData({ ...emptyForm });
        setDocuments([]);
        setApiError("");
        return;
      }

      setProfile(null);
      setNoProfile(false);
      setApiError(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError("");
    setSuccessMessage("");
  }

  function validateForm() {
    const nextErrors = {};

    if (!formData.fullName.trim()) nextErrors.fullName = "Vui lòng nhập họ tên";
    if (!formData.email.trim()) {
      nextErrors.email = "Vui lòng nhập email";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      nextErrors.email = "Email không đúng định dạng";
    }
    if (!formData.phone.trim()) nextErrors.phone = "Vui lòng nhập số điện thoại";
    if (!formData.school.trim()) nextErrors.school = "Vui lòng nhập trường";
    if (!formData.major.trim()) nextErrors.major = "Vui lòng nhập ngành";

    const gpa = Number(formData.gpa);
    if (formData.gpa !== "" && (Number.isNaN(gpa) || gpa < 0 || gpa > 4)) {
      nextErrors.gpa = "GPA phải từ 0 đến 4";
    }

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function buildPayload() {
    return {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      school: formData.school.trim(),
      major: formData.major.trim(),
      academicYear: formData.academicYear.trim(),
      gpa: formData.gpa === "" ? null : Number(formData.gpa),
      birthDate: formData.birthDate || null,
    };
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!validateForm()) return;
    if (formDisabled) return;

    try {
      setSaving(true);
      setApiError("");
      setSuccessMessage("");

      const payload = buildPayload();
      const response = profile
        ? await internApi.updateProfile(profile.id, payload)
        : await internApi.createProfile(payload);

      if (!response.success) {
        setApiError(response.message || "Không lưu được hồ sơ");
        return;
      }

      const saved = response.data;
      setProfile(saved);
      setNoProfile(false);
      setFormData(profileToForm(saved));
      setSuccessMessage(
        profile ? "Cập nhật hồ sơ thành công." : "Tạo hồ sơ mới thành công."
      );
      await loadDocuments(saved.id);
    } catch (error) {
      setApiError(getApiErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  async function handleSubmitProfile() {
    if (!profile?.id || (profile.status !== "DRAFT" && profile.status !== "REJECTED")) return;

    try {
      setSubmitting(true);
      setApiError("");
      setSuccessMessage("");

      const response = await internApi.submitProfile(profile.id);

      if (!response.success) {
        setApiError(response.message || "Không nộp được hồ sơ");
        return;
      }

      const submitted = response.data;
      setProfile(submitted);
      setFormData(profileToForm(submitted));
      setSuccessMessage("Nộp hồ sơ thành công. Hồ sơ đang chờ HR/Admin duyệt.");
    } catch (error) {
      setApiError(getApiErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUpload(file) {
    if (!file || !profile?.id || formDisabled) return;

    try {
      setUploading(true);
      setApiError("");
      setSuccessMessage("");

      const form = new FormData();
      form.append("file", file);
      form.append("documentType", "CV");

      const response = await documentApi.uploadDocument(form);

      if (!response.success) {
        setApiError(response.message || "Tải lên thất bại");
        return;
      }

      setSuccessMessage("Tải tài liệu lên thành công.");
      await loadDocuments(profile.id);
    } catch (error) {
      setApiError(getApiErrorMessage(error));
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  return (
    <div className="hr-intern-page intern-profile-page">
      <div className="hr-intern-header">
        <div>
          <h2 className="hr-intern-title">{pageTitle}</h2>
          <p className="hr-intern-subtitle">{pageSubtitle}</p>
        </div>
        {profile?.status && (
          <span className={`badge badge--${profile.status.toLowerCase()}`}>
            {profile.status}
          </span>
        )}
      </div>

      {isHrInternMockEnabled && (
        <div className="alert alert--success">
          Đang dùng mock (VITE_HR_INTERN_MOCK=true). Tắt khi demo API thật.
        </div>
      )}

      {apiError && <div className="alert alert--error">{apiError}</div>}
      {successMessage && (
        <div className="alert alert--success">{successMessage}</div>
      )}

      {loading ? (
        <div className="loading-state">
          <span className="loading-spinner" />
          Đang tải hồ sơ...
        </div>
      ) : (
        <>
          {noProfile && (
            <div className="alert alert--info">
              Chưa có hồ sơ, tạo mới thông tin bên dưới và lưu để bắt đầu.
            </div>
          )}

          <form onSubmit={handleSave} className="intern-profile-layout">
            <div className="hr-intern-detail-card">
              <div className="hr-intern-detail-card__header">
                <h3>Thông tin hồ sơ</h3>
              </div>

              <InternProfileForm
                formData={formData}
                errors={formErrors}
                onChange={handleChange}
                disabled={formDisabled}
              />

              <div className="intern-profile-actions">
                <Button type="submit" disabled={saving || formDisabled}>
                  {saving ? "Đang lưu..." : profile ? "Lưu thay đổi" : "Tạo hồ sơ"}
                </Button>

                {profile && (
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={submitting || (profile.status !== "DRAFT" && profile.status !== "REJECTED")}
                    onClick={handleSubmitProfile}
                  >
                    {submitting ? "Đang nộp..." : "Nộp hồ sơ"}
                  </Button>
                )}
              </div>
            </div>

            <div className="hr-intern-detail-card">
              <div className="hr-intern-detail-card__header">
                <h3>Tài liệu đính kèm</h3>
              </div>

              {profile ? (
                <>
                  <div className="intern-upload-row">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      disabled={uploading || formDisabled}
                      onChange={(e) => handleUpload(e.target.files?.[0])}
                    />
                    {uploading && (
                      <span className="intern-upload-status">Đang tải lên...</span>
                    )}
                  </div>
                  <DocumentList documents={documents} />
                </>
              ) : (
                <p className="empty-state__desc">
                  Lưu hồ sơ trước khi tải tài liệu lên.
                </p>
              )}
            </div>
          </form>

          {profile && !isDraft && (
            <p className="intern-profile-locked-note">
              Hồ sơ đã nộp — các trường và chức năng tải lên đã bị khóa.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default InternProfileContent;
