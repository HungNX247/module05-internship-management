function getServerMessage(data) {
  if (!data) return null;
  if (typeof data === "string") return data;
  return data.message || data.error || null;
}

export function getApiErrorMessage(error, fallback = "Đã xảy ra lỗi. Vui lòng thử lại.") {
  if (!error?.response) {
    return "Không kết nối được tới máy chủ";
  }

  const status = error.response.status;
  const serverMessage = getServerMessage(error.response.data);

  switch (status) {
    case 400:
      return serverMessage || "Dữ liệu không hợp lệ";
    case 401:
      return "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại";
    case 403:
      return "Bạn không có quyền thực hiện thao tác này";
    case 404:
      return serverMessage || "Không tìm thấy tài nguyên";
    case 409:
      return serverMessage || "Dữ liệu xung đột, vui lòng thử lại";
    case 413:
      return "File vượt quá dung lượng cho phép";
    case 415:
      return "Định dạng file không được hỗ trợ";
    default:
      if (status >= 500) {
        return "Hệ thống đang gặp sự cố, vui lòng thử lại sau";
      }
      return serverMessage || fallback;
  }
}
