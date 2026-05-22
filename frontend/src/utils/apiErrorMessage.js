export function getApiErrorMessage(error, fallback = "Đã xảy ra lỗi. Vui lòng thử lại.") {
  const status = error?.response?.status;
  const serverMessage = error?.response?.data?.message;

  if (status === 401) {
    return (
      serverMessage ||
      "Phiên đăng nhập hết hạn hoặc chưa đăng nhập. Vui lòng đăng nhập lại."
    );
  }

  if (status === 403) {
    return (
      serverMessage ||
      "Bạn không có quyền truy cập chức năng này (yêu cầu role HR)."
    );
  }

  if (status === 500) {
    return serverMessage || "Lỗi máy chủ (500). Vui lòng thử lại sau.";
  }

  return serverMessage || fallback;
}
