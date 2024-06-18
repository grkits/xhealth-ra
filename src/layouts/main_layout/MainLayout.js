import { useState } from "react";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import SideBar from "../../common/sidebar/SideBar";
import ContentLayout from "../content_layout/ContentLayout";
import "./MainLayout.css";
import { BrowserRouter } from "react-router-dom";
import { Space, AutoComplete } from "antd";
import members_data from "../../data/member_data.json";

const { Header } = Layout;

function MainLayout() {
  const [collapsed, setCollapsed] = useState(true);
  const [options, setOptions] = useState([]);

  const handleSearch = (value) => {
    setOptions(value?.length > 2 ? searchResult(value) : []);
  };

  const searchResult = (query) => {
    let searchData = [];
    let optionsArr = [];
    members_data.map((data) => {
      if (
        data?.pat_id?.toString()?.toLowerCase()?.includes(query?.toLowerCase())
      )
        searchData.push(data);
    });
    searchData.map((obj) => {
      optionsArr.push({
        value: obj?.pat_id,
        key: obj?.id,
        label: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{obj?.pat_id}</span>
          </div>
        ),
      });
    });
    return optionsArr;
  };

  const clearSearchFilter = () => {};

  const onSelect = (value, option) => {
    window.location.assign("/risk-adjustment/members/" + option?.key);
  };

  return (
    <Layout>
      <BrowserRouter>
        <SideBar collapsed={collapsed} />
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <div className="header-collapse">
              {collapsed ? (
                <MenuUnfoldOutlined
                  className="trigger"
                  onClick={() => setCollapsed(!collapsed)}
                />
              ) : (
                <MenuFoldOutlined
                  className="trigger"
                  onClick={() => setCollapsed(!collapsed)}
                />
              )}
            </div>
            <Space className="header-logo">
              <img
                className="img-logo-prop"
                src="https://felixsolutions.ai/wp-content/uploads/2023/03/logo.png"
              />
            </Space>
            <Space style={{ float: "right", paddingRight: "20px" }}>
              <AutoComplete
                dropdownMatchSelectWidth={252}
                style={{ width: 300, textAlign: "left" }}
                options={options}
                onSelect={(value, option) => onSelect(value, option)}
                onSearch={handleSearch}
                allowClear
                onClear={clearSearchFilter}
                placeholder="Member Search"
              />
            </Space>
          </Header>
          <ContentLayout />
        </Layout>
      </BrowserRouter>
    </Layout>
  );
}

export default MainLayout;
