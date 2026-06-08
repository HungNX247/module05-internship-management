import { useEffect, useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import MentorTable from "../../../components/mentor/MentorTable";
import MentorForm from "../../../components/mentor/MentorForm";
import { mentorApi } from "../../../api/mentorApi";
import { getApiErrorMessage } from "../../../utils/apiErrorMessage";
import "../../../styles/mentor-management.css";

function MentorListPage() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function loadMentors(filters = { keyword, status }) {
    setLoading(true);
    setErrorMessage("");
    try {
      const params = {};
      if (filters.keyword?.trim()) params.keyword = filters.keyword.trim();
      if (filters.status) params.status = filters.status;

      const res = await mentorApi.getMentors(params);
      if (res?.success) {
        setMentors(res.data || []);
      } else {
        setMentors([]);
        setErrorMessage(res?.message || "Không tải được danh sách mentor");
      }
    } catch (error) {
      setMentors([]);
      setErrorMessage(getApiErrorMessage(error, "Không tải được danh sách mentor"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMentors();
  }, []);

  function handleSearch() {
    loadMentors({ keyword, status });
  }

  function handleReset() {
    setKeyword("");
    setStatus("");
    loadMentors({ keyword: "", status: "" });
  }

  function handleOpenCreate() {
    setSelectedMentor(null);
    setShowForm(true);
  }

  function handleOpenEdit(mentor) {
    setSelectedMentor(mentor);
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
    setSelectedMentor(null);
  }

  async function handleSubmit(payload) {
    setSubmitting(true);
    setErrorMessage("");
    try {
      let res;
      if (selectedMentor) {
        res = await mentorApi.updateMentor(selectedMentor.id, payload);
      } else {
        res = await mentorApi.createMentor(payload);
      }

      if (res?.success) {
        const msg = selectedMentor ? "Cập nhật mentor thành công" : "Tạo mentor thành công";
        setSuccessMessage(msg);
        handleCloseForm();
        loadMentors();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage(res?.message || "Thao tác thất bại");
      }
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <MainLayout>
      <div className="mentor-page">
        <div className="mentor-page__header">
          <div>
            <h2 className="mentor-page__title">Quản lý Mentor</h2>
            <p className="mentor-page__subtitle">
              Xem và quản lý danh sách mentor trong hệ thống
            </p>
          </div>
          <button className="btn btn-primary" onClick={handleOpenCreate}>
            + Thêm mentor
          </button>
        </div>

        {successMessage && <div className="alert alert--success">{successMessage}</div>}
        {errorMessage && <div className="alert alert--error">{errorMessage}</div>}

        <div className="mentor-filter-box">
          <div className="mentor-filter-field">
            <label className="form-label">Tìm kiếm</label>
            <input
              type="text"
              className="form-input"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tên, email, chuyên môn..."
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <div className="mentor-filter-field">
            <label className="form-label">Trạng thái</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="ACTIVE">Đang hoạt động</option>
              <option value="INACTIVE">Không hoạt động</option>
            </select>
          </div>
          <div className="mentor-filter-actions">
            <button className="btn btn-primary btn-sm" onClick={handleSearch}>
              Tìm kiếm
            </button>
            <button className="btn btn-secondary btn-sm" onClick={handleReset}>
              Đặt lại
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <span className="loading-spinner" />
            Đang tải danh sách mentor...
          </div>
        ) : (
          <MentorTable mentors={mentors} onEdit={handleOpenEdit} />
        )}

        <MentorForm
          open={showForm}
          mentor={selectedMentor}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </div>
    </MainLayout>
  );
}

export default MentorListPage;
