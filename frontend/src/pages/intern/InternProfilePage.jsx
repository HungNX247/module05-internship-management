import InternProfileContent from "../../components/intern/InternProfileContent";
import MainLayout from "../../layouts/MainLayout";
import "../../styles/hr-intern.css";

function InternProfilePage() {
  return (
    <MainLayout>
      <InternProfileContent
        pageTitle="Hồ sơ thực tập"
        pageSubtitle="Xem và cập nhật hồ sơ, tài liệu đính kèm của bạn"
      />
    </MainLayout>
  );
}

export default InternProfilePage;
