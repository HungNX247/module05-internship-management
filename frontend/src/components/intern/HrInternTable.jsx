import { Button } from "../common";

const STATUS_BADGE = {
  DRAFT: "badge--draft",
  PENDING: "badge--pending",
  APPROVED: "badge--active",
  REJECTED: "badge--inactive",
};

const STATUS_LABEL = {
  DRAFT: "Bản nháp",
  PENDING: "Chờ duyệt",
  APPROVED: "Đã duyệt",
  REJECTED: "Đã từ chối",
};

function HrInternTable({ interns, onViewDetail }) {
  if (!interns || interns.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">🎓</div>
        <p className="empty-state__title">Không có hồ sơ thực tập sinh nào</p>
        <p className="empty-state__desc">
          Thử đổi bộ lọc hoặc chờ thực tập sinh nộp hồ sơ.
        </p>
      </div>
    );
  }

  return (
    <div className="hr-intern-table-card">
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Trường</th>
            <th>Ngành</th>
            <th>Năm học</th>
            <th>GPA</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {interns.map((intern) => (
            <tr key={intern.id}>
              <td>
                <strong>#{intern.id}</strong>
              </td>
              <td>{intern.fullName || "-"}</td>
              <td>{intern.email || "-"}</td>
              <td>{intern.phone || "-"}</td>
              <td>{intern.school || "-"}</td>
              <td>{intern.major || "-"}</td>
              <td>{intern.academicYear || "-"}</td>
              <td>{intern.gpa ?? "-"}</td>
              <td>
                <span
                  className={`badge ${STATUS_BADGE[intern.status] || "badge--draft"}`}
                >
                  {STATUS_LABEL[intern.status] || intern.status || "-"}
                </span>
              </td>
              <td>
                <div className="table-actions">
                  <Button
                    type="button"
                    variant="secondary"
                    className="btn-sm"
                    onClick={() => onViewDetail(intern)}
                  >
                    Xem chi tiết
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

export default HrInternTable;
