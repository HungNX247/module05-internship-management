import InternProfileContent from "../../components/intern/InternProfileContent";
import MainLayout from "../../layouts/MainLayout";
import "../../styles/hr-intern.css";

function InternApplyPage() {
  return (
    <MainLayout>
      <InternProfileContent
        pageTitle="Đăng ký thực tập"
        pageSubtitle="Tạo hồ sơ mới hoặc tiếp tục hoàn thiện hồ sơ đăng ký"
      />
    </MainLayout>
  );
}

export default InternApplyPage;
