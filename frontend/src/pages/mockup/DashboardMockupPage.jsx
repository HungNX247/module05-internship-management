import MainLayout from "../../layouts/MainLayout";

function DashboardMockupPage() {
  return (
    <MainLayout>
      <h2>Dashboard Mockup</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>120</h3>
          <p>Thực tập sinh</p>
        </div>

        <div style={cardStyle}>
          <h3>12</h3>
          <p>Mentor</p>
        </div>

        <div style={cardStyle}>
          <h3>8</h3>
          <p>Chương trình</p>
        </div>

        <div style={cardStyle}>
          <h3>95%</h3>
          <p>Hoàn thành</p>
        </div>
      </div>
    </MainLayout>
  );
}

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
};

export default DashboardMockupPage;
