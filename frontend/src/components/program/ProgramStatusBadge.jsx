function ProgramStatusBadge({ status }) {
  const statusMap = {
    UPCOMING: "Sắp diễn ra",
    RUNNING: "Đang diễn ra",
    FINISHED: "Đã kết thúc",
  };

  return (
    <span className={`program-status-badge status-${status?.toLowerCase()}`}>
      {statusMap[status] || status || "N/A"}
    </span>
  );
}

export default ProgramStatusBadge;
