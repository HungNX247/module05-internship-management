/** Mock data for HR/Intern UI when BE chưa sẵn sàng. Bật: VITE_HR_INTERN_MOCK=true */

const MOCK_MY_PROFILE_KEY = "mockInternMyProfile";

function readMockMyProfile() {
  try {
    const raw = localStorage.getItem(MOCK_MY_PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeMockMyProfile(profile) {
  if (profile) {
    localStorage.setItem(MOCK_MY_PROFILE_KEY, JSON.stringify(profile));
  } else {
    localStorage.removeItem(MOCK_MY_PROFILE_KEY);
  }
}

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
  const totalPages =
    totalItems === 0 ? 0 : Math.max(1, Math.ceil(totalItems / size));
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

export function getMockMyProfile() {
  const profile = readMockMyProfile();
  if (!profile) {
    const error = new Error("Chưa có hồ sơ intern (mock)");
    error.response = { status: 404, data: { message: "Chưa có hồ sơ intern" } };
    throw error;
  }
  return {
    success: true,
    message: "Get my profile successfully (mock)",
    data: profile,
  };
}

export function createMockMyProfile(data) {
  const existing = readMockMyProfile();
  if (existing) {
    return {
      success: false,
      message: "Hồ sơ đã tồn tại (mock)",
      code: "CONFLICT",
    };
  }

  const profile = {
    id: 99,
    userId: 10,
    status: "DRAFT",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...data,
  };

  writeMockMyProfile(profile);
  MOCK_DOCUMENTS_BY_INTERN[profile.id] = MOCK_DOCUMENTS_BY_INTERN[profile.id] || [];

  return {
    success: true,
    message: "Tạo hồ sơ thành công (mock)",
    data: profile,
  };
}

export function updateMockMyProfile(id, data) {
  const profile = readMockMyProfile();
  if (!profile || String(profile.id) !== String(id)) {
    return { success: false, message: "Không tìm thấy hồ sơ (mock)" };
  }

  const updated = {
    ...profile,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  writeMockMyProfile(updated);

  return {
    success: true,
    message: "Cập nhật hồ sơ thành công (mock)",
    data: updated,
  };
}

export function submitMockMyProfile(id) {
  const profile = readMockMyProfile();
  if (!profile || String(profile.id) !== String(id)) {
    return { success: false, message: "Không tìm thấy hồ sơ (mock)" };
  }

  if (profile.status !== "DRAFT") {
    const error = new Error("Hồ sơ đã được nộp (mock)");
    error.response = {
      status: 409,
      data: { message: "Hồ sơ đã được nộp, không thể nộp lại" },
    };
    throw error;
  }

  const submitted = {
    ...profile,
    status: "SUBMITTED",
    updatedAt: new Date().toISOString(),
  };
  writeMockMyProfile(submitted);

  return {
    success: true,
    message: "Nộp hồ sơ thành công (mock)",
    data: submitted,
  };
}

export function uploadMockDocument(formData) {
  const profile = readMockMyProfile();
  if (!profile) {
    return { success: false, message: "Chưa có hồ sơ để upload tài liệu (mock)" };
  }

  const file = formData.get("file");
  const fileName = file?.name || "document.pdf";
  const fileSize = file?.size || 0;
  const ext = fileName.split(".").pop()?.toUpperCase() || "FILE";

  const newDoc = {
    id: Date.now(),
    fileName,
    fileType: ext,
    fileSize,
    uploadedAt: new Date().toISOString(),
    fileUrl: null,
  };

  const internId = profile.id;
  MOCK_DOCUMENTS_BY_INTERN[internId] = [
    ...(MOCK_DOCUMENTS_BY_INTERN[internId] || []),
    newDoc,
  ];

  return {
    success: true,
    message: "Upload tài liệu thành công (mock)",
    data: newDoc,
  };
}

export const isHrInternMockEnabled =
  import.meta.env.VITE_HR_INTERN_MOCK === "true";

/** UI-011: VITE_HR_INTERN_MOCK_ERROR=401|403|500 để test message lỗi */
export function throwMockApiErrorIfConfigured() {
  const code = import.meta.env.VITE_HR_INTERN_MOCK_ERROR;
  if (!code || !isHrInternMockEnabled) return;

  const status = Number(code);
  const messages = {
    401: "Unauthorized — phiên đăng nhập không hợp lệ (mock test)",
    403: "Forbidden — không có quyền HR (mock test)",
    500: "Internal Server Error — lỗi server (mock test)",
  };

  const error = new Error(messages[status] || "Mock API error");
  error.response = {
    status,
    data: { message: messages[status] || "Mock API error" },
  };
  throw error;
}
