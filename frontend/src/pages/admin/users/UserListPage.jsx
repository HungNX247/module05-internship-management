import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Pagination } from "../../../components/common";
import { userApi } from "../../../api/userApi";
import UserFilter from "../../../components/user/UserFilter";
import UserTable from "../../../components/user/UserTable";
import MainLayout from "../../../layouts/MainLayout";
import "../../../styles/user-management.css";

function UserListPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function loadUsers(
    nextPage = page,
    filters = { keyword, role, status }
  ) {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await userApi.getUsers({
        page: nextPage,
        size,
        keyword: filters.keyword || undefined,
        role: filters.role || undefined,
        status: filters.status || undefined,
      });

      if (!response.success) {
        setErrorMessage(response.message || "Không tải được danh sách user");
        return;
      }

      setUsers(response.data?.items || []);
      setPage(response.data?.page ?? nextPage);
      setTotalPages(response.data?.totalPages || 0);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
        "Không tải được danh sách user. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers(0);
  }, []);

  function handleSearch() {
    loadUsers(0);
  }

  function handleReset() {
    setKeyword("");
    setRole("");
    setStatus("");
    loadUsers(0, { keyword: "", role: "", status: "" });
  }

  function handleEdit(user) {
    navigate(`/admin/users/${user.id}/edit`);
  }

  async function handleToggleStatus(user) {
    const nextStatus = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    const actionText = nextStatus === "INACTIVE" ? "khóa" : "mở khóa";
    const confirmed = window.confirm(`Bạn có chắc muốn ${actionText} user này?`);
    if (!confirmed) return;

    try {
      setErrorMessage("");
      setSuccessMessage("");

      const response = await userApi.updateUserStatus(user.id, nextStatus);

      if (!response.success) {
        setErrorMessage(response.message || "Cập nhật trạng thái thất bại");
        return;
      }

      setSuccessMessage("Cập nhật trạng thái user thành công");
      loadUsers(page);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Cập nhật trạng thái thất bại"
      );
    }
  }

  return (
    <MainLayout>
      <div className="user-management-page">
        <div className="user-management-header">
          <div>
            <h2 className="user-management-title">Quản lý người dùng</h2>
            <p className="user-management-subtitle">
              Tìm kiếm, thêm mới và quản lý tài khoản hệ thống
            </p>
          </div>
          <Button onClick={() => navigate("/admin/users/create")}>
            + Thêm user
          </Button>
        </div>

        {errorMessage && (
          <div className="user-message-error">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="user-message-success">{successMessage}</div>
        )}

        <UserFilter
          keyword={keyword}
          role={role}
          status={status}
          onKeywordChange={setKeyword}
          onRoleChange={setRole}
          onStatusChange={setStatus}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        {loading ? (
          <div className="loading-state">
            <span className="loading-spinner" />
            Đang tải dữ liệu...
          </div>
        ) : (
          <UserTable
            users={users}
            onEdit={handleEdit}
            onToggleStatus={handleToggleStatus}
          />
        )}

        {!loading && (
          <Pagination
            page={page + 1}
            totalPages={totalPages || 1}
            onPageChange={(nextPage) => loadUsers(nextPage - 1)}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default UserListPage;
