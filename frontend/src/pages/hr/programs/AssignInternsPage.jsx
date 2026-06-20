import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout";
import { internApi } from "../../../api/internApi";
import { programApi } from "../../../api/programApi";
import { programAssignmentApi } from "../../../api/programAssignmentApi";

function AssignInternsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [interns, setInterns] = useState([]);
  const [assignedIds, setAssignedIds] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isFinished = program?.status === "FINISHED";
  const availableInterns = interns.filter((intern) => !assignedIds.includes(intern.id));

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [programRes, internRes, assignmentRes] = await Promise.all([
        programApi.getProgramById(id),
        internApi.getInterns({ status: "APPROVED" }),
        programAssignmentApi.getAssignments(id),
      ]);
      
      const pData = programRes.data || programRes;
      setProgram(pData.data || pData);
      
      const iData = internRes.data || internRes || {};
      const internList = iData.items || iData.content || iData.data?.items || iData.data?.content || (Array.isArray(iData.data) ? iData.data : (Array.isArray(iData) ? iData : []));
      setInterns(internList);

      const assignmentData = assignmentRes.data || assignmentRes || {};
      const assignments = Array.isArray(assignmentData.data) ? assignmentData.data : (Array.isArray(assignmentData) ? assignmentData : []);
      setAssignedIds(assignments.map((assignment) => assignment.internProfileId));
      setSelectedIds([]);
    } catch {
      setError("Không thể tải dữ liệu chương trình hoặc thực tập sinh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const toggleIntern = (internId) => {
    setSelectedIds((prev) =>
      prev.includes(internId)
        ? prev.filter((item) => item !== internId)
        : [...prev, internId]
    );
  };

  const handleAssign = async () => {
    if (isFinished) {
      setError("Chương trình đã kết thúc, không thể gán thêm thực tập sinh.");
      return;
    }
    if (selectedIds.length === 0) {
      setError("Vui lòng chọn ít nhất một thực tập sinh để gán.");
      return;
    }
    try {
      setError("");
      await programAssignmentApi.assignInterns(id, selectedIds);
      navigate("/hr/programs");
    } catch (err) {
      setError(err.response?.data?.message || "Gán thực tập sinh thất bại.");
    }
  };

  const handleCancel = () => {
    navigate("/hr/programs");
  };

  return (
    <MainLayout>
      <div className="program-page" style={{ maxWidth: "800px" }}>
        <div style={{ marginBottom: "20px" }}>
          <button 
            onClick={handleCancel}
            className="btn btn-secondary btn-sm"
            style={{ padding: "6px 12px", background: "none", color: "var(--color-text-muted)", border: "1px solid var(--color-border-strong)" }}
          >
            ← Quay lại danh sách
          </button>
        </div>

        <div className="program-card">
          <h1 style={{ marginTop: 0, fontSize: "24px", fontWeight: 700, color: "var(--color-text)", borderBottom: "1px solid var(--color-border)", paddingBottom: "12px", marginBottom: "16px" }}>
            🔗 Gán thực tập sinh vào chương trình
          </h1>
          {program && (
            <p style={{ fontSize: "16px", color: "var(--color-text-muted)", marginBottom: "24px" }}>
              Chương trình: <strong style={{ color: "var(--color-primary)" }}>{program.name}</strong>
            </p>
          )}

          {error && (
            <div className="alert alert--error" style={{ marginBottom: "20px" }}>
              <span>⚠️</span> {error}
            </div>
          )}

          {isFinished && (
            <div className="alert alert--warning" style={{ marginBottom: "20px" }}>
              Chương trình đã kết thúc, không thể gán thêm thực tập sinh.
            </div>
          )}

          <div style={{ marginBottom: "16px", fontWeight: 600, fontSize: "14px", color: "var(--color-text)" }}>
            Danh sách thực tập sinh đã duyệt (APPROVED):
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <span>Đang tải thực tập sinh...</span>
            </div>
          ) : availableInterns.length === 0 ? (
            <div className="empty-state" style={{ padding: "32px 0" }}>
              <div className="empty-state__icon">🎓</div>
              <h3 className="empty-state__title">Không có thực tập sinh nào cần gán</h3>
              <p className="empty-state__desc">Hệ thống không tìm thấy thực tập sinh nào có trạng thái APPROVED chưa được gán.</p>
            </div>
          ) : (
            <div className="intern-select-list">
              {availableInterns.map((intern) => (
                <label className="intern-select-item" key={intern.id} style={{ cursor: isFinished ? "not-allowed" : "pointer", transition: "var(--transition)", opacity: isFinished ? 0.6 : 1 }}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(intern.id)}
                    disabled={isFinished}
                    onChange={() => toggleIntern(intern.id)}
                    style={{ width: "18px", height: "18px", accentColor: "var(--color-primary)", cursor: isFinished ? "not-allowed" : "pointer" }}
                  />
                  <div style={{ marginLeft: "12px", flex: 1 }}>
                    <div style={{ fontWeight: 600, color: "var(--color-text)" }}>{intern.fullName || intern.name}</div>
                    <div style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>{intern.email}</div>
                  </div>
                  <span className="badge badge--active" style={{ fontSize: "10px" }}>Đã duyệt</span>
                </label>
              ))}
            </div>
          )}

          {availableInterns.length > 0 && !loading && (
            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <button className="btn btn-primary" onClick={handleAssign} disabled={isFinished} style={{ minWidth: "120px" }}>
                Gán thực tập sinh
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>
                Hủy
              </button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default AssignInternsPage;
