import MainLayout from "../../layouts/MainLayout";

function MentorDashboardPage() {
  return (
    <MainLayout>
      <div className="page-header">
        <h2 className="page-header__title">Mentor Dashboard</h2>
        <p className="page-header__subtitle">Theo dõi và hướng dẫn thực tập sinh</p>
      </div>
      <div className="page-card">
        <p style={{ margin: 0, color: "var(--color-text-muted)" }}>
          Trang dashboard dành cho Mentor.
        </p>
      </div>
    </MainLayout>
  );
}

export default MentorDashboardPage;
