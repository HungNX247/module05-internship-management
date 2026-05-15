import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import ContentWrapper from "../components/layout/ContentWrapper";

function MainLayout({ children }) {
  return (
    <div className="app-shell">
      <Header />
      <div className="app-body">
        <Sidebar />
        <ContentWrapper>{children}</ContentWrapper>
      </div>
    </div>
  );
}

export default MainLayout;
