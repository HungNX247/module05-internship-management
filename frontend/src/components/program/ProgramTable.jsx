import React from "react";
import { Link } from "react-router-dom";
import ProgramStatusBadge from "./ProgramStatusBadge";

function ProgramTable({ programs, loading }) {
  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <span>Đang tải chương trình...</span>
      </div>
    );
  }

  if (!programs || programs.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">📅</div>
        <h3 className="empty-state__title">Chưa có chương trình thực tập</h3>
        <p className="empty-state__desc">Nhấn "Thêm chương trình" để tạo mới chương trình thực tập.</p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Tên chương trình</th>
            <th>Phòng ban</th>
            <th>Mentor</th>
            <th>Thời gian</th>
            <th>Số lượng</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program) => (
            <tr key={program.id}>
              <td style={{ fontWeight: 600, color: "var(--color-text)" }}>{program.name}</td>
              <td>{program.departmentName}</td>
              <td>
                {program.mentorName ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    👨‍🏫 {program.mentorName}
                  </span>
                ) : (
                  <span style={{ color: "var(--color-text-subtle)", fontStyle: "italic" }}>Chưa gán</span>
                )}
              </td>
              <td>
                <span style={{ whiteSpace: "nowrap" }}>{program.startDate}</span>
                <span style={{ margin: "0 8px", color: "var(--color-text-subtle)" }}>→</span>
                <span style={{ whiteSpace: "nowrap" }}>{program.endDate}</span>
              </td>
              <td style={{ fontWeight: 600 }}>{program.maxInterns}</td>
              <td><ProgramStatusBadge status={program.status} /></td>
              <td>
                <div className="table-actions">
                  <Link to={`/hr/programs/${program.id}/edit`} className="btn btn-secondary btn-sm" style={{ padding: "6px 12px" }}>
                    Sửa
                  </Link>
                  <Link to={`/hr/programs/${program.id}/assign-interns`} className="btn btn-primary btn-sm" style={{ padding: "6px 12px" }}>
                    Gán intern
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProgramTable;
