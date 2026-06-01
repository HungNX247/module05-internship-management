import MainLayout from "../../layouts/MainLayout";
import "../../styles/dashboard.css";

function InternDashboardPage() {
  return (
    <MainLayout>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1>Hành trình học tập của tôi</h1>
            <p>Bạn đã hoàn thành 65% kỳ thực tập "Phát triển Frontend".</p>
          </div>
          <button className="badge badge-success" style={{ border: 'none', cursor: 'pointer', padding: '0.5rem 1rem' }}>
            Nộp báo cáo tuần
          </button>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#e0e7ff', color: '#4f46e5' }}>⏳</div>
            <div className="stat-value">8/12</div>
            <div className="stat-label">Tuần đã hoàn thành</div>
            <div className="stat-trend trend-up">Tiếp tục cố gắng!</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#dcfce7', color: '#10b981' }}>✅</div>
            <div className="stat-value">24</div>
            <div className="stat-label">Công việc đã hoàn thành</div>
            <div className="stat-trend trend-up">↑ 3 tuần này</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fef9c3', color: '#f59e0b' }}>⭐</div>
            <div className="stat-value">4.5</div>
            <div className="stat-label">Đánh giá từ mentor</div>
            <div className="stat-trend">Top 10%</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>📅</div>
            <div className="stat-value">2</div>
            <div className="stat-label">Hạn sắp tới</div>
            <div className="stat-trend trend-down">Tiếp theo: ngày mai</div>
          </div>
        </div>

        <div className="dashboard-main-grid">
          <div className="card">
            <div className="card-header">
              <h3>Công việc hiện tại của tôi</h3>
              <a href="#" style={{ fontSize: '0.875rem' }}>Xem tất cả</a>
            </div>
            <div className="card-body">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Tên công việc</th>
                    <th>Hạn hoàn thành</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Xây dựng header responsive</td>
                    <td>Hôm nay, 17:00</td>
                    <td><span className="badge badge-primary">Đang thực hiện</span></td>
                  </tr>
                  <tr>
                    <td>Tích hợp API - Module người dùng</td>
                    <td>18/05/2026</td>
                    <td><span className="badge badge-warning">Đang chờ</span></td>
                  </tr>
                  <tr>
                    <td>Viết unit test cho xác thực</td>
                    <td>20/05/2026</td>
                    <td><span className="badge badge-warning">Đang chờ</span></td>
                  </tr>
                  <tr>
                    <td>Thiết lập cấu trúc dự án</td>
                    <td>Đã hoàn thành</td>
                    <td><span className="badge badge-success">Hoàn thành</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Tài nguyên và công cụ</h3>
            </div>
            <div className="card-body">
              <div className="quick-actions">
                <div className="action-btn">
                  <span>📚</span>
                  Hướng dẫn
                </div>
                <div className="action-btn">
                  <span>🛠️</span>
                  Công cụ dev
                </div>
                <div className="action-btn">
                  <span>💬</span>
                  Chat với mentor
                </div>
                <div className="action-btn">
                  <span>📁</span>
                  Tài liệu dự án
                </div>
              </div>
              
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Tiến độ tổng thể</h4>
                <div style={{ height: '20px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ width: '65%', height: '100%', background: 'linear-gradient(90deg, #4f46e5, #818cf8)' }}></div>
                  <span style={{ position: 'absolute', right: '10px', top: '0', fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}>65%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default InternDashboardPage;
