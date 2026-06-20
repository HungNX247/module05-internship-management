import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout";
import { programApi } from "../../../api/programApi";
import ProgramTable from "../../../components/program/ProgramTable";
import "../../../styles/program-management.css";

function ProgramListPage() {
  const [allPrograms, setAllPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadPrograms = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await programApi.getPrograms({});
      const data = res.data?.data || res.data || [];
      setAllPrograms(data);
    } catch (err) {
      setError(err.response?.data?.message || "Không tải được danh sách chương trình. Vui lòng kiểm tra kết nối.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrograms();
  }, []);

  useEffect(() => {
    if (status) {
      setFilteredPrograms(allPrograms.filter(p => p.status === status));
    } else {
      setFilteredPrograms(allPrograms);
    }
  }, [status, allPrograms]);

  return (
    <MainLayout>
      <div className="program-page">
        <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 700, color: "var(--color-text)" }}>📅 Chương trình thực tập</h1>
            <p style={{ margin: "4px 0 0 0", color: "var(--color-text-muted)" }}>Quản lý danh sách chương trình thực tập của doanh nghiệp</p>
          </div>
          <Link className="btn btn-primary" to="/hr/programs/create">
            ➕ Thêm chương trình
          </Link>
        </div>

        {error && (
          <div className="alert alert--error" style={{ marginBottom: "20px" }}>
            <span>⚠️</span> {error}
          </div>
        )}

        <div className="program-card">
          <div className="filter-bar" style={{ display: "flex", justifyContent: "flex-start", gap: "16px", marginBottom: "20px" }}>
            <div style={{ width: "240px" }}>
              <select 
                className="form-select" 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                style={{ padding: "8px 12px" }}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="UPCOMING">🟢 Sắp diễn ra</option>
                <option value="RUNNING">🔵 Đang diễn ra</option>
                <option value="FINISHED">🔴 Đã kết thúc</option>
              </select>
            </div>
          </div>

          <ProgramTable programs={filteredPrograms} loading={loading} />
        </div>
      </div>
    </MainLayout>
  );
}

export default ProgramListPage;
