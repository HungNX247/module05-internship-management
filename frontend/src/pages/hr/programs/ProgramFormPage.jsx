import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout";
import ProgramForm from "../../../components/program/ProgramForm";
import { programApi } from "../../../api/programApi";
import { departmentApi } from "../../../api/departmentApi";
import { mentorApi } from "../../../api/mentorApi";

const initialForm = {
  name: "",
  departmentId: "",
  mentorId: "",
  startDate: "",
  endDate: "",
  maxInterns: 1,
  description: "",
};

function ProgramFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [departments, setDepartments] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [departmentRes, mentorRes] = await Promise.all([
          departmentApi.getDepartments(),
          mentorApi.getMentors(),
        ]);
        setDepartments(departmentRes.data?.data || departmentRes.data || []);
        setMentors(mentorRes.data?.data || mentorRes.data || []);
      } catch (err) {
        console.error("Không tải được tùy chọn", err);
      }
    };
    loadOptions();
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    const loadProgram = async () => {
      try {
        const res = await programApi.getProgramById(id);
        const program = res.data?.data || res.data;
        setFormData({
          name: program.name || "",
          departmentId: program.departmentId || "",
          mentorId: program.mentorId || "",
          startDate: program.startDate || "",
          endDate: program.endDate || "",
          maxInterns: program.maxInterns || 1,
          description: program.description || "",
        });
      } catch (err) {
        console.error("Không tải được chi tiết chương trình", err);
      }
    };
    loadProgram();
  }, [id, isEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = "Vui lòng nhập tên chương trình";
    if (!formData.departmentId) nextErrors.departmentId = "Vui lòng chọn phòng ban";
    if (!formData.startDate || !formData.endDate) nextErrors.date = "Vui lòng chọn đủ ngày";
    if (formData.startDate && formData.endDate && formData.endDate < formData.startDate) {
      nextErrors.date = "Ngày kết thúc không được trước ngày bắt đầu";
    }
    if (!formData.maxInterns || Number(formData.maxInterns) <= 0) {
      nextErrors.maxInterns = "Số lượng intern phải lớn hơn 0";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const payload = {
        ...formData,
        departmentId: Number(formData.departmentId),
        mentorId: formData.mentorId ? Number(formData.mentorId) : null,
        maxInterns: Number(formData.maxInterns),
      };
      if (isEdit) await programApi.updateProgram(id, payload);
      else await programApi.createProgram(payload);
      navigate("/hr/programs");
    } catch (err) {
      setErrors({ name: err.response?.data?.message || "Lỗi khi lưu chương trình. Vui lòng thử lại." });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/hr/programs");
  };

  return (
    <MainLayout>
      <div className="program-page" style={{ maxWidth: "800px" }}>
        <div style={{ marginBottom: "20px" }}>
          <button 
            onClick={handleCancel}
            className="btn btn-secondary btn-sm"
            style={{ padding: "6px 12px", background: "none", color: "var(--color-text-muted)", border: "1px solid var(--color-border-strong)" }}
          >
            ← Quay lại danh sách
          </button>
        </div>

        <div className="program-card">
          <h1 style={{ marginTop: 0, fontSize: "24px", fontWeight: 700, color: "var(--color-text)", borderBottom: "1px solid var(--color-border)", paddingBottom: "12px", marginBottom: "24px" }}>
            {isEdit ? "✏️ Sửa chương trình" : "➕ Thêm chương trình"}
          </h1>
          <ProgramForm
            formData={formData}
            departments={departments}
            mentors={mentors}
            errors={errors}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitLabel={isEdit ? "Cập nhật" : "Tạo chương trình"}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default ProgramFormPage;
