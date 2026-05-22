/** Mock data for HR intern UI (T-059–T-061) when BE chưa sẵn sàng. Bật: VITE_HR_INTERN_MOCK=true */

export const MOCK_INTERNS = [
  {
    id: 1,
    userId: 10,
    fullName: "Nguyễn Văn Intern",
    email: "intern.profile@gmail.com",
    phone: "0912345678",
    school: "Đại học Công nghiệp Hà Nội",
    major: "Công nghệ thông tin",
    academicYear: "Năm 4",
    gpa: 3.2,
    status: "SUBMITTED",
    createdAt: "2026-05-18T10:00:00",
    updatedAt: "2026-05-18T10:00:00",
  },
  {
    id: 2,
    userId: 11,
    fullName: "Trần Thị Học",
    email: "tran.hoc@example.com",
    phone: "0987654321",
    school: "Đại học Bách Khoa",
    major: "Kỹ thuật phần mềm",
    academicYear: "Năm 3",
    gpa: 3.5,
    status: "PENDING",
    createdAt: "2026-05-19T14:30:00",
    updatedAt: "2026-05-19T14:30:00",
  },
  {
    id: 3,
    userId: 12,
    fullName: "Lê Văn Draft",
    email: "le.draft@example.com",
    phone: "0900111222",
    school: "Đại học Công nghiệp Hà Nội",
    major: "An toàn thông tin",
    academicYear: "Năm 2",
    gpa: 2.8,
    status: "DRAFT",
    createdAt: "2026-05-17T09:00:00",
    updatedAt: "2026-05-17T09:00:00",
  },
];

export const MOCK_DOCUMENTS_BY_INTERN = {
  1: [
    {
      id: 101,
      fileName: "CV_NguyenVanIntern.pdf",
      fileType: "PDF",
      fileSize: 245760,
      uploadedAt: "2026-05-18T11:00:00",
      fileUrl: null,
    },
    {
      id: 102,
      fileName: "Don_xin_thuc_tap.docx",
      fileType: "DOCX",
      fileSize: 51200,
      uploadedAt: "2026-05-18T11:05:00",
      fileUrl: null,
    },
  ],
  2: [],
  3: [],
};

export function filterMockInterns({ school, major, status, page = 0, size = 10 }) {
  let items = [...MOCK_INTERNS];

  if (school) {
    const q = school.toLowerCase();
    items = items.filter((i) => i.school?.toLowerCase().includes(q));
  }
  if (major) {
    const q = major.toLowerCase();
    items = items.filter((i) => i.major?.toLowerCase().includes(q));
  }
  if (status) {
    items = items.filter((i) => i.status === status);
  }

  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / size));
  const start = page * size;
  const paged = items.slice(start, start + size);

  return {
    success: true,
    message: "Get interns successfully (mock)",
    data: {
      items: paged,
      page,
      size,
      totalPages,
      totalItems,
    },
  };
}

export function getMockInternById(id) {
  const intern = MOCK_INTERNS.find((i) => String(i.id) === String(id));
  if (!intern) {
    return { success: false, message: "Không tìm thấy hồ sơ intern (mock)" };
  }
  return {
    success: true,
    message: "Get intern successfully (mock)",
    data: intern,
  };
}

export function getMockDocumentsByInternId(internId) {
  const docs = MOCK_DOCUMENTS_BY_INTERN[internId] || [];
  return {
    success: true,
    message: "Get documents successfully (mock)",
    data: docs,
  };
}

export const isHrInternMockEnabled =
  import.meta.env.VITE_HR_INTERN_MOCK === "true";
