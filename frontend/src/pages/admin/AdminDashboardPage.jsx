import MainLayout from "../../layouts/MainLayout";

function AdminDashboardPage() {
  return (
    <MainLayout>
      <div className="page-header">
        <h2 className="page-header__title">Admin Dashboard</h2>
        <p className="page-header__subtitle">
          Tổng quan hệ thống quản lý thực tập
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-card__label">Người dùng</div>
          <div className="stat-card__value">—</div>
          <p className="stat-card__hint">Quản lý tại User Management</p>
        </div>
        <div className="stat-card">
          <div className="stat-card__label">Thực tập sinh</div>
          <div className="stat-card__value">—</div>
          <p className="stat-card__hint">Sắp có ở sprint tiếp theo</p>
        </div>
        <div className="stat-card">
          <div className="stat-card__label">Mentor</div>
          <div className="stat-card__value">—</div>
          <p className="stat-card__hint">Sắp có ở sprint tiếp theo</p>
        </div>
      </div>
    </MainLayout>
  );
}

export default AdminDashboardPage;
