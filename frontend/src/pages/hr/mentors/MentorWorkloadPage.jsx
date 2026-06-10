import { useEffect, useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import WorkloadTable from "../../../components/mentor/WorkloadTable";
import { mentorApi } from "../../../api/mentorApi";
import { getApiErrorMessage } from "../../../utils/apiErrorMessage";
import "../../../styles/mentor-management.css";

function MentorWorkloadPage() {
  const [workloads, setWorkloads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadWorkload() {
    setLoading(true);
    setErrorMessage("");
    try {
      const res = await mentorApi.getWorkload();
      if (res?.success) {
        setWorkloads(res.data || []);
      } else {
        setWorkloads([]);
        setErrorMessage(res?.message || "Không tải được dữ liệu workload");
      }
    } catch (error) {
      setWorkloads([]);
      setErrorMessage(getApiErrorMessage(error, "Không tải được dữ liệu workload"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWorkload();
  }, []);

  return (
    <MainLayout>
      <div className="mentor-page">
        <div className="mentor-page__header">
          <div>
            <h2 className="mentor-page__title">Workload Mentor</h2>
            <p className="mentor-page__subtitle">
              Thống kê số intern đang được hướng dẫn bởi từng mentor
            </p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={loadWorkload} disabled={loading}>
            Làm mới
          </button>
        </div>

        {errorMessage && <div className="alert alert--error">{errorMessage}</div>}

        {loading ? (
          <div className="loading-state">
            <span className="loading-spinner" />
            Đang tải dữ liệu workload...
          </div>
        ) : (
          <WorkloadTable workloads={workloads} />
        )}
      </div>
    </MainLayout>
  );
}

export default MentorWorkloadPage;
