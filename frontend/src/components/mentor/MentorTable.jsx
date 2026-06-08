function MentorTable({ mentors, onEdit }) {
  if (!mentors.length) {
    return (
      <div className="empty-state">
        <p className="empty-state__title">Không tìm thấy mentor nào</p>
        <p className="empty-state__desc">Thử thay đổi bộ lọc hoặc thêm mentor mới.</p>
      </div>
    );
  }

  return (
    <div className="mentor-table-card">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Vị trí</th>
            <th>Chuyên môn</th>
            <th>Phòng ban</th>
            <th className="text-center">Max intern</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {mentors.map((mentor) => (
            <tr key={mentor.id}>
              <td style={{ fontWeight: 600 }}>{mentor.fullName}</td>
              <td>{mentor.email}</td>
              <td>{mentor.position || "—"}</td>
              <td>{mentor.expertise || "—"}</td>
              <td>{mentor.departmentName || "—"}</td>
              <td className="text-center">{mentor.maxInterns}</td>
              <td>
                <span className={`badge badge--${mentor.status === "ACTIVE" ? "active" : "inactive"}`}>
                  {mentor.status === "ACTIVE" ? "Đang hoạt động" : "Không hoạt động"}
                </span>
              </td>
              <td>
                <button className="btn btn-secondary btn-sm" onClick={() => onEdit(mentor)}>
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

export default MentorTable;
