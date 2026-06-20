function DepartmentStatusBadge({ status }) {
  const isActive = status === "ACTIVE";

  return (
    <span className={`badge badge--${isActive ? "active" : "inactive"}`}>
      {isActive ? "Đang hoạt động" : "Không hoạt động"}
    </span>
  );
}

export default DepartmentStatusBadge;
