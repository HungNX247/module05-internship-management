import DepartmentStatusBadge from "./DepartmentStatusBadge";

function DepartmentTable({ departments, onEdit }) {
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
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => onEdit(department)}
                >
                  Sửa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentTable;
