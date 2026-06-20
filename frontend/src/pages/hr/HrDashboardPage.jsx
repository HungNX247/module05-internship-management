import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { internApi } from "../../api/internApi";
import { programApi } from "../../api/programApi";
import { mentorApi } from "../../api/mentorApi";
import "../../styles/dashboard.css";

function HrDashboardPage() {
  const [stats, setStats] = useState({
    interns: 0,
    programs: 0,
    mentors: 0,
    activePrograms: 0,
  });
  const [recentPrograms, setRecentPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [internsRes, programsRes, mentorsRes] = await Promise.all([
          internApi.getInterns({}),
          programApi.getPrograms({}),
          mentorApi.getMentors({}),
        ]);

        // Extract Interns count
        const internsData = internsRes.data || internsRes || {};
        const internsList = internsData.items || internsData.content || (Array.isArray(internsData.data) ? internsData.data : (Array.isArray(internsData) ? internsData : []));
        const totalInterns = internsData.totalElements || internsList.length || 0;

        // Extract Programs count
        const programsList = programsRes.data?.data || programsRes.data || [];
        const activePrograms = programsList.filter(p => p.status === "RUNNING").length;

        // Extract Mentors count
        const mentorsList = mentorsRes.data?.data || mentorsRes.data || [];

        setStats({
          interns: totalInterns,
          programs: programsList.length,
          mentors: mentorsList.length,
          activePrograms,
        });

        // Sort programs by ID in descending order to get the latest created first, and take top 5
        const sortedPrograms = [...programsList].sort((a, b) => b.id - a.id);
        setRecentPrograms(sortedPrograms.slice(0, 5));
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu Dashboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <MainLayout>
      <div className="dashboard-container">
        <header className="dashboard-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "1.875rem", fontWeight: 700 }}>🏢 Trung tâm quản lý thực tập</h1>
            <p style={{ color: "var(--color-text-muted)", margin: "0.25rem 0 0 0" }}>Chào mừng quay lại! Theo dõi nhanh các số liệu thực tế trên hệ thống.</p>
          </div>
          <Link to="/hr/programs/create" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            ➕ Thêm chương trình
          </Link>
        </header>

        <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#e0e7ff', color: '#4f46e5' }}>🎓</div>
            <div className="stat-value">{loading ? "..." : stats.interns}</div>
            <div className="stat-label">Thực tập sinh trên hệ thống</div>
            <div className="stat-trend trend-up" style={{ color: "var(--color-success)" }}>↑ Đang hoạt động</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#dcfce7', color: '#10b981' }}>📅</div>
            <div className="stat-value">{loading ? "..." : stats.programs}</div>
            <div className="stat-label">Chương trình thực tập</div>
            <div className="stat-trend trend-up" style={{ color: "var(--color-success)" }}>↑ {stats.activePrograms} đang diễn ra</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fef9c3', color: '#f59e0b' }}>👨‍🏫</div>
            <div className="stat-value">{loading ? "..." : stats.mentors}</div>
            <div className="stat-label">Mentor hướng dẫn</div>
            <div className="stat-trend" style={{ color: "var(--color-text-muted)" }}>Ổn định</div>
          </div>
        </div>

        <div className="dashboard-main-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem", marginTop: "1.5rem" }}>
          <div className="card">
            <div className="card-header">
              <h3>Chương trình thực tập mới nhất</h3>
              <Link to="/hr/programs" style={{ fontSize: '0.875rem', fontWeight: 500, color: "var(--color-primary)" }}>Xem tất cả</Link>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              {loading ? (
                <div style={{ padding: "32px", textAlign: "center", color: "var(--color-text-muted)" }}>
                  <div className="loading-spinner" style={{ margin: "0 auto 12px auto" }}></div>
                  <span>Đang tải chương trình thực tập...</span>
                </div>
              ) : recentPrograms.length === 0 ? (
                <div style={{ padding: "48px 24px", textAlign: "center", color: "var(--color-text-muted)" }}>
                  <span>📅</span>
                  <div style={{ marginTop: "8px", fontWeight: 500 }}>Chưa có chương trình thực tập nào</div>
                </div>
              ) : (
                <ul className="activity-list" style={{ padding: "0 24px", margin: 0 }}>
                  {recentPrograms.map((program) => {
                    const statusColorMap = {
                      UPCOMING: "#4f46e5",
                      RUNNING: "#10b981",
                      FINISHED: "#ef4444",
                    };
                    const statusLabelMap = {
                      UPCOMING: "Sắp diễn ra",
                      RUNNING: "Đang diễn ra",
                      FINISHED: "Đã kết thúc",
                    };
                    return (
                      <li key={program.id} className="activity-item" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0" }}>
                        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                          <div className="activity-dot" style={{ background: statusColorMap[program.status] || "#94a3b8" }}></div>
                          <div>
                            <div style={{ fontWeight: 600, color: "var(--color-text)" }}>{program.name}</div>
                            <div style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "4px" }}>
                              {program.departmentName} • Mentor: {program.mentorName || "Chưa gán"}
                            </div>
                          </div>
                        </div>
                        <span 
                          className="badge" 
                          style={{
                            background: program.status === "RUNNING" ? "#ecfdf5" : program.status === "UPCOMING" ? "#eff6ff" : "#f1f5f9",
                            color: program.status === "RUNNING" ? "#065f46" : program.status === "UPCOMING" ? "#1e40af" : "#475569",
                            fontSize: "11px",
                            padding: "4px 8px",
                            fontWeight: 700
                          }}
                        >
                          {statusLabelMap[program.status] || program.status}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Công cụ nhanh cho HR</h3>
            </div>
            <div className="card-body">
              <div className="quick-actions">
                <Link to="/hr/programs" className="action-btn">
                  <span>📅</span>
                  Chương trình
                </Link>
                <Link to="/hr/interns" className="action-btn">
                  <span>🎓</span>
                  Thực tập sinh
                </Link>
                <Link to="/hr/mentors" className="action-btn">
                  <span>👨‍🏫</span>
                  Quản lý Mentor
                </Link>
                <Link to="/hr/mentor-assignment" className="action-btn">
                  <span>🔗</span>
                  Gán Mentor
                </Link>
                <Link to="/hr/mentor-workload" className="action-btn" style={{ gridColumn: "span 2" }}>
                  <span>📊</span>
                  Xem Workload Mentor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default HrDashboardPage;
