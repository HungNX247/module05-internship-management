import { Button, Input } from "../../components/common";

function LoginMockupPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f6f8",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "white",
          padding: "32px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
          Đăng nhập
        </h2>

        <Input label="Email" type="email" placeholder="Nhập email" />
        <Input label="Mật khẩu" type="password" placeholder="Nhập mật khẩu" />

        <Button variant="primary" type="button">
          Đăng nhập
        </Button>
      </div>
    </div>
  );
}

export default LoginMockupPage;
