import { getCurrentUser } from "../services/tokenService";

const STATIC_INTERNS = [
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
    status: "APPROVED",
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

const STATIC_DOCUMENTS = {
  1: [
    {
      id: 101,
      fileName: "CV_NguyenVanIntern.pdf",
      fileType: "PDF",
      fileSize: 245760,
      uploadedAt: "2026-05-18T11:00:00",
      fileUrl: "/sample.pdf",
      documentType: "CV"
    },
    {
      id: 102,
      fileName: "Don_xin_thuc_tap.docx",
      fileType: "DOCX",
      fileSize: 51200,
      uploadedAt: "2026-05-18T11:05:00",
      fileUrl: "/sample.pdf",
      documentType: "APPLICATION_LETTER"
    },
  ],
  2: [],
  3: [],
};

function getStoredInterns() {
  const data = localStorage.getItem("MOCK_INTERNS");
  if (!data) {
    localStorage.setItem("MOCK_INTERNS", JSON.stringify(STATIC_INTERNS));
    return STATIC_INTERNS;
  }
  return JSON.parse(data);
}

function saveStoredInterns(interns) {
  localStorage.setItem("MOCK_INTERNS", JSON.stringify(interns));
}

function getStoredDocuments() {
  const data = localStorage.getItem("MOCK_DOCUMENTS");
  if (!data) {
    localStorage.setItem("MOCK_DOCUMENTS", JSON.stringify(STATIC_DOCUMENTS));
    return STATIC_DOCUMENTS;
  }
  return JSON.parse(data);
}

function saveStoredDocuments(docs) {
  localStorage.setItem("MOCK_DOCUMENTS", JSON.stringify(docs));
}

export const isHrInternMockEnabled =
  import.meta.env.VITE_HR_INTERN_MOCK === "true";

export function throwMockApiErrorIfConfigured() {
  const code = import.meta.env.VITE_HR_INTERN_MOCK_ERROR;
  if (!code || !isHrInternMockEnabled) return;

  const status = Number(code);
  const messages = {
    401: "Chưa xác thực - phiên đăng nhập không hợp lệ (mock test)",
    403: "Không có quyền truy cập HR (mock test)",
    500: "Lỗi hệ thống - lỗi server (mock test)",
  };

  const error = new Error(messages[status] || "Lỗi API mock");
  error.response = {
    status,
    data: { message: messages[status] || "Lỗi API mock" },
  };
  throw error;
}

export function getMockMyProfile() {
  const user = getCurrentUser();
  if (!user) return { success: false, message: "Chưa đăng nhập (mock)" };

  const interns = getStoredInterns();
  const profile = interns.find((i) => i.userId === user.id);
  return {
    success: true,
    data: profile || null,
  };
}

export function createMockIntern(payload) {
  const user = getCurrentUser();
  if (!user) return { success: false, message: "Chưa đăng nhập (mock)" };

  const interns = getStoredInterns();

  let profile = interns.find((i) => i.userId === user.id);
  if (profile) {
    return { success: false, message: "Hồ sơ đã tồn tại" };
  }

  const newId = interns.length > 0 ? Math.max(...interns.map((i) => i.id)) + 1 : 1;
  profile = {
    id: newId,
    userId: user.id,
    ...payload,
    status: "DRAFT",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  interns.push(profile);
  saveStoredInterns(interns);

  const docs = getStoredDocuments();
  docs[newId] = [];
  saveStoredDocuments(docs);

  return {
    success: true,
    message: "Tạo hồ sơ thành công (mock)",
    data: profile,
  };
}

export function updateMockIntern(id, payload) {
  const interns = getStoredInterns();
  const idx = interns.findIndex((i) => String(i.id) === String(id));
  if (idx === -1) {
    return { success: false, message: "Không tìm thấy hồ sơ (mock)" };
  }

  const profile = interns[idx];
  if (profile.status !== "DRAFT" && profile.status !== "REJECTED") {
    return { success: false, message: "Hồ sơ đã nộp không thể chỉnh sửa!" };
  }

  const updatedProfile = {
    ...profile,
    ...payload,
    updatedAt: new Date().toISOString(),
  };

  interns[idx] = updatedProfile;
  saveStoredInterns(interns);

  return {
    success: true,
    message: "Cập nhật hồ sơ thành công (mock)",
    data: updatedProfile,
  };
}

export function submitMockIntern(id) {
  const interns = getStoredInterns();
  const idx = interns.findIndex((i) => String(i.id) === String(id));
  if (idx === -1) {
    return { success: false, message: "Không tìm thấy hồ sơ (mock)" };
  }

  const profile = interns[idx];
  const updatedProfile = {
    ...profile,
    status: "PENDING",
    rejectReason: null,
    updatedAt: new Date().toISOString(),
  };

  interns[idx] = updatedProfile;
  saveStoredInterns(interns);

  return {
    success: true,
    message: "Nộp hồ sơ thành công (mock)",
    data: updatedProfile,
  };
}

export function uploadMockDocument(formData) {
  const file = formData.get("file");
  const internProfileId = formData.get("internProfileId");
  const documentType = formData.get("documentType");

  if (!internProfileId) {
    return { success: false, message: "Cần lưu hồ sơ trước khi tải tài liệu lên" };
  }

  const docs = getStoredDocuments();
  if (!docs[internProfileId]) {
    docs[internProfileId] = [];
  }

  const newDoc = {
    id: Date.now(),
    fileName: file ? file.name : "uploaded_document.pdf",
    fileType: file ? file.name.split(".").pop()?.toUpperCase() || "PDF" : "PDF",
    fileSize: file ? file.size : 102400,
    uploadedAt: new Date().toISOString(),
    fileUrl: "/sample.pdf",
    documentType: documentType || "CV",
  };

  docs[internProfileId].push(newDoc);
  saveStoredDocuments(docs);

  return {
    success: true,
    message: "Tải tài liệu lên thành công (mock)",
    data: newDoc,
  };
}

export function filterMockInterns({ school, major, status, page = 0, size = 10 }) {
  let items = getStoredInterns();

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
    message: "Lấy danh sách thực tập sinh thành công (mock)",
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
  const interns = getStoredInterns();
  const intern = interns.find((i) => String(i.id) === String(id));
  if (!intern) {
    return { success: false, message: "Không tìm thấy hồ sơ thực tập sinh (mock)" };
  }
  return {
    success: true,
    message: "Lấy thông tin thực tập sinh thành công (mock)",
    data: intern,
  };
}

export function getMockDocumentsByInternId(internId) {
  const docs = getStoredDocuments();
  const list = docs[internId] || [];
  return {
    success: true,
    message: "Lấy danh sách tài liệu thành công (mock)",
    data: list,
  };
}
