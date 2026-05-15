import { Link } from "react-router-dom";
import "../../styles/user-management.css";

function ForbiddenPage() {
  return (
    <div className="forbidden-page">
      <div className="forbidden-card">
        <h2>403</h2>
        <p>Bạn không có quyền truy cập trang này.</p>
        <Link to="/login">Quay về đăng nhập</Link>
      </div>
    </div>
  );
}

export default ForbiddenPage;
