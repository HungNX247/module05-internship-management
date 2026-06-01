import MainLayout from "../../layouts/MainLayout";
import "../../styles/dashboard.css";

function AdminDashboardPage() {
  return (
    <MainLayout>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1>Tổng quan Admin</h1>
            <p>Chào mừng Admin quay lại. Đây là tình hình hôm nay.</p>
          </div>
          <button className="badge badge-primary" style={{ border: 'none', cursor: 'pointer', padding: '0.5rem 1rem' }}>
            Tạo báo cáo
          </button>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#e0e7ff', color: '#4f46e5' }}>👥</div>
            <div className="stat-value">1,284</div>
            <div className="stat-label">Tổng người dùng</div>
            <div className="stat-trend trend-up">↑ 12% so với tháng trước</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#dcfce7', color: '#10b981' }}>💼</div>
            <div className="stat-value">42</div>
            <div className="stat-label">Kỳ thực tập đang hoạt động</div>
            <div className="stat-trend trend-up">↑ 4 tuần này</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fef9c3', color: '#f59e0b' }}>📝</div>
            <div className="stat-value">15</div>
            <div className="stat-label">Yêu cầu đang chờ</div>
            <div className="stat-trend trend-down">↓ 2 so với hôm qua</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>🛡️</div>
            <div className="stat-value">99.9%</div>
            <div className="stat-label">Thời gian hoạt động hệ thống</div>
            <div className="stat-trend trend-up">Ổn định</div>
          </div>
        </div>

        <div className="dashboard-main-grid">
          <div className="card">
            <div className="card-header">
              <h3>Hoạt động hệ thống</h3>
              <a href="#" style={{ fontSize: '0.875rem' }}>Xem tất cả</a>
            </div>
            <div className="card-body">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Người dùng</th>
                    <th>Hành động</th>
                    <th>Thời gian</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Nguyen Van A</td>
                    <td>Cập nhật vai trò: HR</td>
                    <td>2 phút trước</td>
                    <td><span className="badge badge-success">Thành công</span></td>
                  </tr>
                  <tr>
                    <td>Hệ thống</td>
                    <td>Sao lưu cơ sở dữ liệu</td>
                    <td>45 phút trước</td>
                    <td><span className="badge badge-success">Thành công</span></td>
                  </tr>
                  <tr>
                    <td>Le Thi B</td>
                    <td>Lần thử đăng nhập</td>
                    <td>1 giờ trước</td>
                    <td><span className="badge badge-warning">Cảnh báo</span></td>
                  </tr>
                  <tr>
                    <td>Admin</td>
                    <td>Đã xóa người dùng #421</td>
                    <td>3 giờ trước</td>
                    <td><span className="badge badge-success">Thành công</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Thao tác nhanh</h3>
            </div>
            <div className="card-body">
              <div className="quick-actions">
                <div className="action-btn">
                  <span>➕</span>
                  Thêm người dùng
                </div>
                <div className="action-btn">
                  <span>⚙️</span>
                  Cài đặt
                </div>
                <div className="action-btn">
                  <span>📊</span>
                  Nhật ký
                </div>
                <div className="action-btn">
                  <span>✉️</span>
                  Thông báo
                </div>
              </div>
              
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Dung lượng sử dụng</h4>
                <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '65%', height: '100%', background: '#4f46e5' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: '#64748b' }}>
                  <span>Đã dùng: 65GB</span>
                  <span>Tổng: 100GB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AdminDashboardPage;
