function WorkloadTable({ workloads }) {
  if (!workloads.length) {
    return (
      <div className="empty-state">
        <p className="empty-state__title">Không có dữ liệu workload</p>
        <p className="empty-state__desc">Chưa có mentor nào đang hoạt động trong hệ thống.</p>
      </div>
    );
  }

  return (
    <div className="mentor-table-card">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Họ tên mentor</th>
            <th>Phòng ban</th>
            <th className="text-center">Tối đa intern</th>
            <th className="text-center">Đang hướng dẫn</th>
            <th className="text-center">Còn trống</th>
          </tr>
        </thead>
        <tbody>
          {workloads.map((item) => (
            <tr key={item.mentorId}>
              <td style={{ fontWeight: 600 }}>{item.mentorName}</td>
              <td>{item.departmentName || "—"}</td>
              <td className="text-center">{item.maxInterns}</td>
              <td className="text-center">{item.assignedInterns}</td>
              <td className="text-center">
                <span className={`badge ${item.availableSlots === 0 ? "badge--workload-full" : "badge--workload-available"}`}>
                  {item.availableSlots === 0 ? "Đã đầy" : item.availableSlots}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WorkloadTable;
