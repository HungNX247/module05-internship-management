import DepartmentStatusBadge from "./DepartmentStatusBadge";

function DepartmentTable({ departments, onEdit, onDeactivate, deactivatingId }) {
  if (!departments.length) {
    return (
      <div className="empty-state">
        <p className="empty-state__title">Chưa có phòng ban nào</p>
        <p className="empty-state__desc">Nhấn &quot;Thêm phòng ban&quot; để tạo phòng ban mới.</p>
      </div>
    );
  }

  return (
    <div className="department-table-card">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Tên phòng ban</th>
            <th>Mô tả</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td style={{ fontWeight: 600 }}>{department.name}</td>
              <td>{department.description || "—"}</td>
              <td>
                <DepartmentStatusBadge status={department.status} />
              </td>
              <td>
                <div className="department-table-actions">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => onEdit(department)}
                  >
                    Sửa
                  </button>
                  {department.status === "ACTIVE" && (
                    <button
                      className="btn btn-secondary btn-sm department-action-danger"
                      disabled={deactivatingId === department.id}
                      onClick={() => onDeactivate(department)}
                    >
                      {deactivatingId === department.id ? "Đang xử lý..." : "Ngừng hoạt động"}
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentTable;
