import MainLayout from "../../layouts/MainLayout";
import "../../styles/dashboard.css";

function MentorDashboardPage() {
  return (
    <MainLayout>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1>Bảng điều khiển mentor</h1>
            <p>Bạn hiện đang hướng dẫn 4 thực tập sinh trong chương trình.</p>
          </div>
          <button className="badge badge-primary" style={{ border: 'none', cursor: 'pointer', padding: '0.5rem 1rem' }}>
            Lên lịch họp nhóm
          </button>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#e0e7ff', color: '#4f46e5' }}>💻</div>
            <div className="stat-value">4</div>
            <div className="stat-label">Thực tập sinh được phân công</div>
            <div className="stat-trend">Đã đủ số lượng</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#dcfce7', color: '#10b981' }}>💬</div>
            <div className="stat-value">12</div>
            <div className="stat-label">Đánh giá đang chờ</div>
            <div className="stat-trend trend-up">↑ 5 mục mới hôm nay</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fef9c3', color: '#f59e0b' }}>🕒</div>
            <div className="stat-value">1.5h</div>
            <div className="stat-label">Thời gian hôm nay</div>
            <div className="stat-trend">Đúng tiến độ</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>💡</div>
            <div className="stat-value">8</div>
            <div className="stat-label">Yêu cầu hỗ trợ đang mở</div>
            <div className="stat-trend trend-down">↓ 2 yêu cầu đã xử lý</div>
          </div>
        </div>

        <div className="dashboard-main-grid">
          <div className="card">
            <div className="card-header">
              <h3>Theo dõi tiến độ thực tập sinh</h3>
              <a href="#" style={{ fontSize: '0.875rem' }}>Xem danh sách đầy đủ</a>
            </div>
            <div className="card-body">
              <ul className="activity-list">
                <li className="activity-item">
                  <div style={{ width: '40px', height: '40px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>JD</div>
                  <div className="activity-content">
                    <div className="activity-title">John Doe - Lập trình viên Backend</div>
                    <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', marginTop: '8px' }}>
                      <div style={{ width: '80%', height: '100%', background: '#10b981', borderRadius: '3px' }}></div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge badge-success">Đúng tiến độ</span>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Hoàn thành 80%</div>
                  </div>
                </li>
                <li className="activity-item">
                  <div style={{ width: '40px', height: '40px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>AS</div>
                  <div className="activity-content">
                    <div className="activity-title">Alice Smith - Thiết kế UI</div>
                    <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', marginTop: '8px' }}>
                      <div style={{ width: '45%', height: '100%', background: '#f59e0b', borderRadius: '3px' }}></div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge badge-warning">Chậm tiến độ</span>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Hoàn thành 45%</div>
                  </div>
                </li>
                <li className="activity-item">
                  <div style={{ width: '40px', height: '40px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>BV</div>
                  <div className="activity-content">
                    <div className="activity-title">Bob Vance - Thực tập sinh QA</div>
                    <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', marginTop: '8px' }}>
                      <div style={{ width: '95%', height: '100%', background: '#10b981', borderRadius: '3px' }}></div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge badge-success">Đúng tiến độ</span>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Hoàn thành 95%</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Công cụ mentor</h3>
            </div>
            <div className="card-body">
              <div className="quick-actions">
                <div className="action-btn">
                  <span>📝</span>
                  Đánh giá
                </div>
                <div className="action-btn">
                  <span>📅</span>
                  Đồng bộ
                </div>
                <div className="action-btn">
                  <span>📈</span>
                  Thống kê
                </div>
                <div className="action-btn">
                  <span>🎓</span>
                  Tài nguyên
                </div>
              </div>
              
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Mốc sắp tới</h4>
                <div style={{ padding: '1rem', background: '#f1f5f9', borderRadius: '8px', borderLeft: '4px solid #4f46e5' }}>
                  <div style={{ fontWeight: '600', color: '#1e293b' }}>Thuyết trình giữa kỳ</div>
                  <div style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '4px' }}>20/05, 14:00 • Hội trường chính</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default MentorDashboardPage;
