import { Button } from "../common";

const ROLE_BADGE = {
  ADMIN: "badge--role-admin",
  HR: "badge--role-hr",
  MENTOR: "badge--role-mentor",
  INTERN: "badge--role-intern",
};

function UserTable({ users, onEdit, onToggleStatus }) {
  if (!users || users.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">📋</div>
        <p className="empty-state__title">Không có người dùng nào</p>
        <p className="empty-state__desc">
          Thử đổi bộ lọc hoặc thêm người dùng mới.
        </p>
      </div>
    );
  }

  return (
    <div className="user-table-card">
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <strong>#{user.id}</strong>
              </td>
              <td>{user.fullName || "-"}</td>
              <td>{user.email|| "-"}</td>
              <td>{user.phone|| "-"}</td>
              <td>
                <span
                  className={`badge ${ROLE_BADGE[user.role] || "badge--role-intern"}`}
                >
                  {user.role}
                </span>
              </td>
              <td>
                <span
                  className={`badge ${
                    user.status === "ACTIVE"
                      ? "badge--active"
                      : "badge--inactive"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td>
                <div className="table-actions">
                  <Button
                    type="button"
                    variant="secondary"
                    className="btn-sm"
                    onClick={() => onEdit(user)}
                  >
                    Sửa
                  </Button>
                  <Button
                    type="button"
                    variant={user.status === "ACTIVE" ? "danger" : "primary"}
                    className="btn-sm"
                    onClick={() => onToggleStatus(user)}
                  >
                    {user.status === "ACTIVE" ? "Khóa" : "Mở khóa"}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
