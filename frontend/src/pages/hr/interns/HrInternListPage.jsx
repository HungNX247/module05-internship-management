import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Pagination } from "../../../components/common";
import HrInternFilter from "../../../components/intern/HrInternFilter";
import HrInternTable from "../../../components/intern/HrInternTable";
import { internApi } from "../../../api/internApi";
import { isHrInternMockEnabled } from "../../../mocks/hrInternMock";
import { getApiErrorMessage } from "../../../utils/apiErrorMessage";
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

      const response = await internApi.getInterns(params);

      if (!response.success) {
        setInterns([]);
        setTotalPages(0);
        setErrorMessage(response.message || "Không tải được danh sách thực tập sinh");
        return;
      }

      const data = response.data || {};

      setInterns(data.items || data.content || []);
      setPage(data.page ?? nextPage);
      setTotalPages(data.totalPages ?? data.totalElements ?? 0);
    } catch (error) {
      setInterns([]);
      setTotalPages(0);
      setErrorMessage(
        getApiErrorMessage(
          error,
          "Không tải được danh sách thực tập sinh. Vui lòng thử lại."
        )
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInterns(0);
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
              Xem, tìm kiếm và lọc hồ sơ thực tập sinh đã nộp trong hệ thống
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

        {!loading && interns.length > 0 && totalPages > 0 && (
          <Pagination
            page={page + 1}
            totalPages={totalPages}
            onPageChange={(nextPage) => loadInterns(nextPage - 1)}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default HrInternListPage;
