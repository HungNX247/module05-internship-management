# API Response Standard

## 1. Mục tiêu
Tài liệu này quy định format response API thống nhất giữa Backend và Frontend.

## 2. Success Response

```json
{
  "success": true,
  "message": "Success message",
  "data": {}
}
```

Ví dụ:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt-token",
    "user": {
      "id": 1,
      "fullName": "System Admin",
      "email": "admin@gmail.com",
      "role": "ADMIN"
    }
  }
}
```

## 3. Error Response

```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

## 4. Validation Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "data": {
    "errors": [
      {
        "field": "email",
        "message": "Email is required"
      },
      {
        "field": "password",
        "message": "Password is required"
      }
    ]
  }
}
```

## 5. Paging Response

```json
{
  "success": true,
  "message": "Get data successfully",
  "data": {
    "items": [],
    "page": 0,
    "size": 10,
    "totalItems": 100,
    "totalPages": 10,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

## 6. HTTP Status Code gợi ý

| HTTP Status | Ý nghĩa |
|---|---|
| 200 | Thành công |
| 201 | Tạo mới thành công |
| 400 | Request sai dữ liệu |
| 401 | Chưa đăng nhập |
| 403 | Không có quyền |
| 404 | Không tìm thấy dữ liệu |
| 409 | Dữ liệu bị trùng hoặc xung đột |
| 500 | Lỗi hệ thống |

## 7. Quy ước field JSON

Backend trả JSON dùng camelCase.

Đúng:
```json
{
  "fullName": "Nguyễn Văn A",
  "createdAt": "2026-05-03T10:00:00"
}
```

Không dùng:
```json
{
  "full_name": "Nguyễn Văn A",
  "created_at": "2026-05-03T10:00:00"
}
```

