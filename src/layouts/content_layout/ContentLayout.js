import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import BlogContainer from "../../containers/blog/BlogContainer";
import RiskDashboard from "../../containers/RiskDashboard/RiskDashboard";
import Members from "../../containers/Members/Members";
import MemberView from "../../containers/MemberView/MemberView";
import MemberNewView from "../../containers/MemberView/MemberNewView";
import SettingView from "../../containers/SettingView/SettingView";
import Reports from "../../containers/Reports/Reports";
import SuspestedMemberList from "../../containers/SuspestedMemberList/SuspestedMemberList";

const { Content } = Layout;

function ContentLayout() {
  return (
    <Content
      className="site-layout-background"
      style={{
        margin: "12px 8px",
        padding: "0 12px",
        minHeight: 280,
        background: "#f1f1f1",
      }}
    >
      <Routes>
        <Route exact path="/" element={<RiskDashboard />} />
        <Route path="/risk-adjustment" element={<BlogContainer />}>
          <Route path="dashboard" element={<RiskDashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="audits" element={<Reports />} />
          <Route
            path="suspected-member-list"
            element={<SuspestedMemberList />}
          />
        </Route>
        <Route path="/risk-adjustment/members-n/:id" element={<MemberView />} />
        <Route
          path="/risk-adjustment/members/:id"
          element={<MemberNewView />}
        />
        <Route path="/settings" element={<SettingView />} />
      </Routes>
    </Content>
  );
}

export default ContentLayout;
