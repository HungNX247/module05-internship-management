import { useEffect, useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import { Pagination, Modal } from "../../../components/common";
import { internApi } from "../../../api/internApi";
import { mentorApi } from "../../../api/mentorApi";
import { getApiErrorMessage } from "../../../utils/apiErrorMessage";
import "../../../styles/mentor-management.css";

function MentorAssignPage() {
  const [interns, setInterns] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [size] = useState(10);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [mentors, setMentors] = useState([]);
  const [mentorsLoading, setMentorsLoading] = useState(false);

  const [assignModal, setAssignModal] = useState({ open: false, intern: null });
  const [selectedMentorId, setSelectedMentorId] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [assignError, setAssignError] = useState("");

  async function loadInterns(nextPage = 0) {
    setLoading(true);
    setErrorMessage("");
    try {
      const res = await internApi.getInterns({ status: "APPROVED", page: nextPage, size });
      if (res?.success) {
        const data = res.data || {};
        setInterns(data.items || data.content || []);
        setPage(typeof data.page === "number" ? data.page : nextPage);
        setTotalPages(data.totalPages || 0);
      } else {
        setInterns([]);
        setErrorMessage(res?.message || "Không tải được danh sách intern");
      }
    } catch (error) {
      setInterns([]);
      setErrorMessage(getApiErrorMessage(error, "Không tải được danh sách intern"));
    } finally {
      setLoading(false);
    }
  }

  async function loadMentors() {
    setMentorsLoading(true);
    try {
      const res = await mentorApi.getMentors({ status: "ACTIVE" });
      if (res?.success) setMentors(res.data || []);
    } catch {
      setMentors([]);
    } finally {
      setMentorsLoading(false);
    }
  }

  useEffect(() => {
    loadInterns(0);
    loadMentors();
  }, []);

  function openAssignModal(intern) {
    setAssignModal({ open: true, intern });
    setSelectedMentorId("");
    setAssignError("");
  }

  function closeAssignModal() {
    setAssignModal({ open: false, intern: null });
    setSelectedMentorId("");
    setAssignError("");
  }

  async function handleAssign() {
    if (!selectedMentorId) {
      setAssignError("Vui lòng chọn mentor");
      return;
    }
    setAssigning(true);
    setAssignError("");
    try {
      const res = await mentorApi.assignMentor(assignModal.intern.id, Number(selectedMentorId));
      if (res?.success) {
        setSuccessMessage(
          `Gán mentor thành công cho intern ${assignModal.intern.fullName}`
        );
        closeAssignModal();
        loadInterns(page);
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setAssignError(res?.message || "Gán mentor thất bại");
      }
    } catch (error) {
      setAssignError(getApiErrorMessage(error));
    } finally {
      setAssigning(false);
    }
  }

  const currentIntern = assignModal.intern;

  return (
    <MainLayout>
      <div className="mentor-page">
        <div className="mentor-page__header">
          <div>
            <h2 className="mentor-page__title">Gán mentor cho thực tập sinh</h2>
            <p className="mentor-page__subtitle">
              Danh sách intern đã được duyệt — chọn mentor phù hợp để gán
            </p>
          </div>
        </div>

        {successMessage && <div className="alert alert--success">{successMessage}</div>}
        {errorMessage && <div className="alert alert--error">{errorMessage}</div>}

        {loading ? (
          <div className="loading-state">
            <span className="loading-spinner" />
            Đang tải danh sách intern...
          </div>
        ) : interns.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state__title">Không có intern nào đã được duyệt</p>
            <p className="empty-state__desc">
              Intern cần được HR duyệt hồ sơ trước khi gán mentor.
            </p>
          </div>
        ) : (
          <div className="mentor-table-card">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>Trường</th>
                  <th>Chuyên ngành</th>
                  <th>GPA</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {interns.map((intern) => (
                  <tr key={intern.id}>
                    <td style={{ fontWeight: 600 }}>{intern.fullName}</td>
                    <td>{intern.email}</td>
                    <td>{intern.school || "—"}</td>
                    <td>{intern.major || "—"}</td>
                    <td>{intern.gpa ?? "—"}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => openAssignModal(intern)}
                        disabled={mentorsLoading}
                      >
                        Gán mentor
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && totalPages > 1 && (
          <Pagination
            page={page + 1}
            totalPages={totalPages}
            onPageChange={(nextPage) => loadInterns(nextPage - 1)}
          />
        )}

        <Modal
          open={assignModal.open}
          title="Gán mentor"
          onClose={closeAssignModal}
        >
          {currentIntern && (
            <div>
              <p className="mentor-assign-intern-info">
                Intern: <strong>{currentIntern.fullName}</strong>
                {currentIntern.school && (
                  <span style={{ color: "var(--color-text-muted)", marginLeft: 8 }}>
                    ({currentIntern.school})
                  </span>
                )}
              </p>

              <div className="form-group">
                <label className="form-label">Chọn mentor</label>
                {mentorsLoading ? (
                  <p style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
                    Đang tải danh sách mentor...
                  </p>
                ) : mentors.length === 0 ? (
                  <div className="alert alert--warning">
                    Không có mentor nào đang hoạt động. Vui lòng kiểm tra lại.
                  </div>
                ) : (
                  <select
                    className={`form-select${assignError ? " form-input-error" : ""}`}
                    value={selectedMentorId}
                    onChange={(e) => {
                      setSelectedMentorId(e.target.value);
                      setAssignError("");
                    }}
                  >
                    <option value="">-- Chọn mentor --</option>
                    {mentors.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.fullName}
                        {m.expertise ? ` — ${m.expertise}` : ""}
                        {m.maxInterns ? ` (tối đa ${m.maxInterns} intern)` : ""}
                      </option>
                    ))}
                  </select>
                )}
                {assignError && <span className="form-error">{assignError}</span>}
              </div>

              <div className="mentor-form-actions">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={closeAssignModal}
                  disabled={assigning}
                >
                  Hủy
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleAssign}
                  disabled={assigning || mentors.length === 0}
                >
                  {assigning ? "Đang gán..." : "Xác nhận gán"}
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </MainLayout>
  );
}

export default MentorAssignPage;
