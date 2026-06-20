import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import ScheduleTable from "../../components/schedule/ScheduleTable";
import { scheduleApi } from "../../api/scheduleApi";
import { getApiErrorMessage } from "../../utils/apiErrorMessage";
import "../../styles/intern-schedule.css";

function InternSchedulePage() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadSchedule() {
    setLoading(true);
    setErrorMessage("");
    try {
      const res = await scheduleApi.getMySchedule();
      if (res?.success) {
        setSchedules(res.data || []);
      } else {
        setSchedules([]);
        setErrorMessage(res?.message || "Không tải được lịch thực tập");
      }
    } catch (error) {
      setSchedules([]);
      setErrorMessage(getApiErrorMessage(error, "Không tải được lịch thực tập"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSchedule();
  }, []);

  return (
    <MainLayout>
      <div className="schedule-page">
        <div className="schedule-page__header">
          <h2 className="schedule-page__title">Lịch thực tập của tôi</h2>
          <p className="schedule-page__subtitle">
            Xem các chương trình thực tập bạn đã được gán
          </p>
        </div>

        {errorMessage && <div className="alert alert--error">{errorMessage}</div>}

        {loading ? (
          <div className="loading-state">
            <span className="loading-spinner" />
            Đang tải lịch thực tập...
          </div>
        ) : (
          <ScheduleTable schedules={schedules} />
        )}
      </div>
    </MainLayout>
  );
}

export default InternSchedulePage;
