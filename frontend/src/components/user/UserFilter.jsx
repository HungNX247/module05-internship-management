import { Button } from "../common";

function UserFilter({
  keyword,
  role,
  status,
  onKeywordChange,
  onRoleChange,
  onStatusChange,
  onSearch,
  onReset,
}) {
  return (
    <div className="user-filter-box">
      <div className="user-filter-field">
        <label>Từ khóa</label>
        <input
          type="text"
          value={keyword}
          placeholder="Tên, email, số điện thoại..."
          onChange={(e) => onKeywordChange(e.target.value)}
        />
      </div>

      <div className="user-filter-field">
        <label>Vai trò</label>
        <select value={role} onChange={(e) => onRoleChange(e.target.value)}>
          <option value="">Tất cả vai trò</option>
          <option value="ADMIN">ADMIN</option>
          <option value="HR">HR</option>
          <option value="MENTOR">MENTOR</option>
          <option value="INTERN">INTERN</option>
        </select>
      </div>

      <div className="user-filter-field">
        <label>Trạng thái</label>
        <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
          <option value="">Tất cả</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>
      </div>

      <div className="user-filter-actions">
        <Button type="button" onClick={onSearch}>
          Tìm kiếm
        </Button>
        <Button type="button" variant="secondary" onClick={onReset}>
          Đặt lại
        </Button>
      </div>
    </div>
  );
}

export default UserFilter;
