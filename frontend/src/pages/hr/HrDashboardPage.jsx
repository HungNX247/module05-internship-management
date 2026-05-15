import MainLayout from "../../layouts/MainLayout";

function HrDashboardPage() {
  return (
    <MainLayout>
      <div className="page-header">
        <h2 className="page-header__title">HR Dashboard</h2>
        <p className="page-header__subtitle">Tổng quan quản lý thực tập sinh</p>
      </div>
      <div className="page-card">
        <p style={{ margin: 0, color: "var(--color-text-muted)" }}>
          Trang dashboard dành cho HR. Các tính năng chi tiết sẽ được bổ sung ở
          sprint tiếp theo.
        </p>
      </div>
    </MainLayout>
  );
}

export default HrDashboardPage;
