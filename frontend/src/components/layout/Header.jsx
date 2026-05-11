function Header() {
  return (
    <header
      style={{
        height: "60px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        background: "#ffffff",
      }}
    >
      <h3 style={{ margin: 0 }}>Internship Management System</h3>
      <div>Người dùng</div>
    </header>
  );
}

export default Header;
