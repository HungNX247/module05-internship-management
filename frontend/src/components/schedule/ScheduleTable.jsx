import ProgramStatusBadge from "../program/ProgramStatusBadge";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("vi-VN");
}

function ScheduleTable({ schedules }) {
  if (!schedules.length) {
    return (
      <div className="empty-state">
        <p className="empty-state__title">Chưa có lịch thực tập</p>
        <p className="empty-state__desc">
          Bạn sẽ thấy lịch tại đây sau khi HR gán bạn vào chương trình thực tập.
        </p>
      </div>
    );
  }

  return (
    <div className="schedule-table-card">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Chương trình</th>
            <th>Phòng ban</th>
            <th>Mentor</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((item) => (
            <tr key={item.programId}>
              <td style={{ fontWeight: 600 }}>{item.programName}</td>
              <td>{item.departmentName || "—"}</td>
              <td>{item.mentorName || "—"}</td>
              <td>{formatDate(item.startDate)}</td>
              <td>{formatDate(item.endDate)}</td>
              <td>
                <ProgramStatusBadge status={item.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleTable;
