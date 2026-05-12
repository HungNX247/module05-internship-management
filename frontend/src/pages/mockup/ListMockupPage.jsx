import MainLayout from "../../layouts/MainLayout";
import { Button, Input, Pagination, Table } from "../../components/common";

function ListMockupPage() {
  const columns = [
    { key: "fullName", title: "Họ tên" },
    { key: "email", title: "Email" },
    { key: "role", title: "Vai trò" },
    { key: "status", title: "Trạng thái" },
  ];

  const data = [
    {
      id: 1,
      fullName: "Nguyễn Văn A",
      email: "a@gmail.com",
      role: "ADMIN",
      status: "ACTIVE",
    },
    {
      id: 2,
      fullName: "Trần Thị B",
      email: "b@gmail.com",
      role: "HR",
      status: "ACTIVE",
    },
  ];

  return (
    <MainLayout>
      <h2>List Page Mockup</h2>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "16px",
          alignItems: "flex-end",
        }}
      >
        <div style={{ flex: 1 }}>
          <Input label="Tìm kiếm" placeholder="Nhập từ khóa..." />
        </div>

        <Button variant="primary">Thêm mới</Button>
      </div>

      <Table columns={columns} data={data} />

      <Pagination page={1} totalPages={5} onPageChange={() => {}} />
    </MainLayout>
  );
}

export default ListMockupPage;
