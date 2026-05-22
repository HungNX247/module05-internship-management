import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Pagination } from "../../../components/common";
import HrInternFilter from "../../../components/intern/HrInternFilter";
import HrInternTable from "../../../components/intern/HrInternTable";
import { internApi } from "../../../api/internApi";
import {
  filterMockInterns,
  isHrInternMockEnabled,
} from "../../../mocks/hrInternMock";
import MainLayout from "../../../layouts/MainLayout";
import "../../../styles/hr-intern.css";

function HrInternListPage() {
  const navigate = useNavigate();

  const [interns, setInterns] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadInterns(
    nextPage = page,
    filters = { school, major, status }
  ) {
    try {
      setLoading(true);
      setErrorMessage("");

      const params = {
        page: nextPage,
        size,
        school: filters.school || undefined,
        major: filters.major || undefined,
        status: filters.status || undefined,
      };

      const response = isHrInternMockEnabled
        ? filterMockInterns(params)
        : await internApi.getInterns(params);

      if (!response.success) {
        setErrorMessage(response.message || "Không tải được danh sách intern");
        return;
      }

      const data = response.data || {};

      setInterns(data.items || data.content || []);
      setPage(data.page ?? nextPage);
      setTotalPages(data.totalPages ?? data.totalElements ?? 0);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Không tải được danh sách intern. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInterns(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSearch() {
    loadInterns(0);
  }

  function handleReset() {
    setSchool("");
    setMajor("");
    setStatus("");

    loadInterns(0, {
      school: "",
      major: "",
      status: "",
    });
  }

  function handleViewDetail(intern) {
    navigate(`/hr/interns/${intern.id}`);
  }

  return (
    <MainLayout>
      <div className="hr-intern-page">
        <div className="hr-intern-header">
          <div>
            <h2 className="hr-intern-title">Danh sách hồ sơ thực tập sinh</h2>
            <p className="hr-intern-subtitle">
              Xem, tìm kiếm và lọc hồ sơ intern đã nộp trong hệ thống
            </p>
          </div>
        </div>

        {isHrInternMockEnabled && (
          <div className="alert alert--success">
            Đang dùng dữ liệu mock (VITE_HR_INTERN_MOCK=true). Tắt khi tích hợp API
            thật.
          </div>
        )}

        {errorMessage && (
          <div className="alert alert--error">{errorMessage}</div>
        )}

        <HrInternFilter
          school={school}
          major={major}
          status={status}
          onSchoolChange={setSchool}
          onMajorChange={setMajor}
          onStatusChange={setStatus}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        {loading ? (
          <div className="loading-state">
            <span className="loading-spinner" />
            Đang tải danh sách hồ sơ...
          </div>
        ) : (
          <HrInternTable interns={interns} onViewDetail={handleViewDetail} />
        )}

        {!loading && (
          <Pagination
            page={page + 1}
            totalPages={totalPages || 1}
            onPageChange={(nextPage) => loadInterns(nextPage - 1)}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default HrInternListPage;
