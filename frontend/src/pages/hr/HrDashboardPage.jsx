import MainLayout from "../../layouts/MainLayout";
import "../../styles/dashboard.css";

function HrDashboardPage() {
  return (
    <MainLayout>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1>Trung tâm tuyển dụng</h1>
            <p>Chào mừng quay lại! Bạn có 3 hồ sơ thực tập mới cần xem xét.</p>
          </div>
          <button className="badge badge-primary" style={{ border: 'none', cursor: 'pointer', padding: '0.5rem 1rem' }}>
            + Đăng vị trí mới
          </button>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#e0e7ff', color: '#4f46e5' }}>🎓</div>
            <div className="stat-value">85</div>
            <div className="stat-label">Thực tập sinh đang hoạt động</div>
            <div className="stat-trend trend-up">↑ 8 trong tháng này</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#dcfce7', color: '#10b981' }}>🏢</div>
            <div className="stat-value">24</div>
            <div className="stat-label">Công ty đối tác</div>
            <div className="stat-trend">Ổn định</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fef9c3', color: '#f59e0b' }}>📋</div>
            <div className="stat-value">12</div>
            <div className="stat-label">Vị trí đang mở</div>
            <div className="stat-trend trend-up">↑ 2 vị trí mới hôm nay</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>⌛</div>
            <div className="stat-value">3.2 ngày</div>
            <div className="stat-label">Thời gian tuyển trung bình</div>
            <div className="stat-trend trend-down">↓ 0.5 ngày</div>
          </div>
        </div>

        <div className="dashboard-main-grid">
          <div className="card">
            <div className="card-header">
              <h3>Lịch phỏng vấn sắp tới</h3>
              <a href="#" style={{ fontSize: '0.875rem' }}>Xem lịch đầy đủ</a>
            </div>
            <div className="card-body">
              <ul className="activity-list">
                <li className="activity-item">
                  <div className="activity-dot" style={{ background: '#4f46e5' }}></div>
                  <div className="activity-content">
                    <div className="activity-title">Phỏng vấn Tran Van C - Thực tập sinh Frontend</div>
                    <div className="activity-time">Hôm nay, 14:00 • Google Meet</div>
                  </div>
                  <span className="badge badge-primary">Sắp diễn ra</span>
                </li>
                <li className="activity-item">
                  <div className="activity-dot" style={{ background: '#10b981' }}></div>
                  <div className="activity-content">
                    <div className="activity-title">Đánh giá cuối: Le Thi D - Thực tập sinh Backend</div>
                    <div className="activity-time">Ngày mai, 10:30 • Phòng 302</div>
                  </div>
                </li>
                <li className="activity-item">
                  <div className="activity-dot" style={{ background: '#f59e0b' }}></div>
                  <div className="activity-content">
                    <div className="activity-title">HR trao đổi với mentor: Hoang Anh</div>
                    <div className="activity-time">16/05, 09:00 • Zoom</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Công cụ nhanh cho HR</h3>
            </div>
            <div className="card-body">
              <div className="quick-actions">
                <div className="action-btn">
                  <span>📄</span>
                  Hợp đồng
                </div>
                <div className="action-btn">
                  <span>📅</span>
                  Sự kiện
                </div>
                <div className="action-btn">
                  <span>📈</span>
                  Báo cáo
                </div>
                <div className="action-btn">
                  <span>💡</span>
                  Nguồn ứng viên
                </div>
              </div>
              
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Mức độ hài lòng của thực tập sinh</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>4.8</div>
                  <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                    Trên thang 5.0<br/>
                    Dựa trên 42 đánh giá
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default HrDashboardPage;
