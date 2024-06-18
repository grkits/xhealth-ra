import { Layout, Menu } from 'antd';
import {
  SnippetsOutlined,
  TeamOutlined,
  BookOutlined,
  AuditOutlined,
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import {
  Link
} from "react-router-dom";
import './SideBar.css'

const { Sider } = Layout;

function SideBar(props) {
  const location = useLocation();

  const onClickLogout = () => {
    localStorage.setItem("userName", "")
    window.location.assign("/login")
  }
  console.log(location?.pathname , "===>", [location?.pathname?.split("/")?.[location?.pathname?.split("/")?.length - 1]] )

  return (
    <Sider trigger={null} collapsible collapsed={props.collapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" selectedKeys={location?.pathname === "/" ? "dashboard" : [location?.pathname?.split("/")?.[location?.pathname?.split("/")?.length - 1]]}>
        <Menu.Item key="dashboard" icon={<BookOutlined />}>
          <Link to="/risk-adjustment/dashboard">
            Dashboard
          </Link>
        </Menu.Item>
        <Menu.Item key="members" icon={<TeamOutlined />}>
          <Link to="/risk-adjustment/members">
            Members
          </Link>
        </Menu.Item>
        <Menu.Item key="suspected-member-list" icon={<SnippetsOutlined />}>
          <Link to="/risk-adjustment/suspected-member-list">
            Suspected Member List
          </Link>
        </Menu.Item>
        <Menu.Item key="audits" icon={<AuditOutlined />}>
          <Link to="/risk-adjustment/audits">
            Audit
          </Link>
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          <Link to="/settings">
            Setting
          </Link>
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          <div onClick={() => onClickLogout()}>Logout</div>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SideBar;