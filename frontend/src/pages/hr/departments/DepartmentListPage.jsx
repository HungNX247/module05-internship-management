import { useEffect, useMemo, useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import DepartmentTable from "../../../components/department/DepartmentTable";
import DepartmentForm from "../../../components/department/DepartmentForm";
import { departmentApi } from "../../../api/departmentApi";
import { getApiErrorMessage } from "../../../utils/apiErrorMessage";
import "../../../styles/department-management.css";

function DepartmentListPage() {
  const [allDepartments, setAllDepartments] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const departments = useMemo(() => {
    if (!status) return allDepartments;
    return allDepartments.filter((item) => item.status === status);
  }, [allDepartments, status]);

  async function loadDepartments() {
    setLoading(true);
    setErrorMessage("");
    try {
      const res = await departmentApi.getDepartments();
      if (res?.success) {
        setAllDepartments(res.data || []);
      } else {
        setAllDepartments([]);
        setErrorMessage(res?.message || "Không tải được danh sách phòng ban");
      }
    } catch (error) {
      setAllDepartments([]);
      setErrorMessage(getApiErrorMessage(error, "Không tải được danh sách phòng ban"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDepartments();
  }, []);

  function handleOpenCreate() {
    setSelectedDepartment(null);
    setShowForm(true);
  }

  function handleOpenEdit(department) {
    setSelectedDepartment(department);
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
    setSelectedDepartment(null);
  }

  async function handleSubmit(payload) {
    setSubmitting(true);
    setErrorMessage("");
    try {
      let res;
      if (selectedDepartment) {
        res = await departmentApi.updateDepartment(selectedDepartment.id, payload);
      } else {
        res = await departmentApi.createDepartment(payload);
      }

      if (res?.success) {
        const msg = selectedDepartment
          ? "Cập nhật phòng ban thành công"
          : "Tạo phòng ban thành công";
        setSuccessMessage(msg);
        handleCloseForm();
        loadDepartments();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage(res?.message || "Thao tác thất bại");
      }
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <MainLayout>
      <div className="department-page">
        <div className="department-page__header">
          <div>
            <h2 className="department-page__title">Quản lý phòng ban</h2>
            <p className="department-page__subtitle">
              Tạo và quản lý danh sách phòng ban dùng cho chương trình thực tập
            </p>
          </div>
          <button className="btn btn-primary" onClick={handleOpenCreate}>
            + Thêm phòng ban
          </button>
        </div>

        {successMessage && <div className="alert alert--success">{successMessage}</div>}
        {errorMessage && <div className="alert alert--error">{errorMessage}</div>}

        <div className="department-filter-box">
          <div className="department-filter-field">
            <label className="form-label">Trạng thái</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="ACTIVE">Đang hoạt động</option>
              <option value="INACTIVE">Không hoạt động</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <span className="loading-spinner" />
            Đang tải danh sách phòng ban...
          </div>
        ) : (
          <DepartmentTable departments={departments} onEdit={handleOpenEdit} />
        )}

        <DepartmentForm
          open={showForm}
          department={selectedDepartment}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </div>
    </MainLayout>
  );
}

export default DepartmentListPage;
