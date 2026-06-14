import { Button } from "../common";

function HrInternFilter({
  school,
  major,
  status,
  onSchoolChange,
  onMajorChange,
  onStatusChange,
  onSearch,
  onReset,
}) {
  return (
    <div className="hr-intern-filter-box">
      <div className="hr-intern-filter-field">
        <label>Trường</label>
        <input
          type="text"
          value={school}
          placeholder="Nhập tên trường..."
          onChange={(e) => onSchoolChange(e.target.value)}
        />
      </div>

      <div className="hr-intern-filter-field">
        <label>Ngành</label>
        <input
          type="text"
          value={major}
          placeholder="Nhập ngành học..."
          onChange={(e) => onMajorChange(e.target.value)}
        />
      </div>

      <div className="hr-intern-filter-field">
        <label>Trạng thái</label>
        <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          <option value="DRAFT">Bản nháp</option>
          <option value="PENDING">Chờ duyệt</option>
          <option value="APPROVED">Đã duyệt</option>
          <option value="REJECTED">Đã từ chối</option>
        </select>
      </div>

      <div className="hr-intern-filter-actions">
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

export default HrInternFilter;
