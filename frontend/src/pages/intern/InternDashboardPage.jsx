import MainLayout from "../../layouts/MainLayout";

function InternDashboardPage() {
  return (
    <MainLayout>
      <div className="page-header">
        <h2 className="page-header__title">Intern Dashboard</h2>
        <p className="page-header__subtitle">Theo dõi tiến độ thực tập của bạn</p>
      </div>
      <div className="page-card">
        <p style={{ margin: 0, color: "var(--color-text-muted)" }}>
          Trang dashboard dành cho Intern.
        </p>
      </div>
    </MainLayout>
  );
}

export default InternDashboardPage;
