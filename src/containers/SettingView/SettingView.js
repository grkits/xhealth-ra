import {
  Select,
  Space,
  Row,
  Col,
  Typography,
  Layout,
  Button,
  Tabs,
} from "antd";
import { FileProtectOutlined, FolderViewOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { useState } from "react";
import UserListView from "./UserListView"
const { Option } = Select;
const { Content } = Layout;

const SettingView = () => {
  const [assignmentCri, setAssignmentCriteria] = useState(null);
  const [auditorList, setAuditorList] = useState(null);
  const [planGroup, setPlanGroup] = useState([]);
  const handleChange = (value) => {
    setAssignmentCriteria(value);
  };
  const handleChangeAudit = (value) => {
    setAuditorList(value);
    let dataSet = JSON.parse(localStorage.getItem("lastSavedValues"));
    let arr = dataSet?.filter((key) => key?.auditorList === value);
    if (arr?.[0]?.planGroup?.length > 0) {
      setPlanGroup([...arr?.[0]?.planGroup]);
    } else {
      setPlanGroup([]);
    }
  };
  const handleChangePlanGroup = (value) => {
    setPlanGroup(value);
  };
  const resetValues = () => {
    let dataSet = JSON.parse(localStorage.getItem("lastSavedValues")) || [];
    let arr =
      dataSet?.length > 0
        ? dataSet.filter((key) => key?.auditorList === auditorList)
        : [];
    if (arr?.length > 0) {
      arr[0].planGroup = [...planGroup];
    } else {
      let obj = {
        assignmentCri: assignmentCri,
        auditorList: auditorList,
        planGroup: planGroup,
      };
      dataSet.push(obj);
    }
    localStorage.setItem("lastSavedValues", JSON.stringify([...dataSet]));
  };

  const assignmentView = () => {
    return (
      <>
        <Row style={{ margin: "20px 0" }}>
          <Select
            value={assignmentCri}
            style={{ width: 200 }}
            onChange={handleChange}
            allowClear
            placeholder="Assignment Criteria"
            options={[{ value: "pcp_grp", label: "PCP Group" }]}
          />
        </Row>
        <Row>
          <Col>
            <Select
              value={auditorList}
              style={{ width: 200 }}
              onChange={handleChangeAudit}
              allowClear
              placeholder="Auditor List"
              options={[
                { value: "Beth", label: "Beth" },
                { value: "Susan", label: "Susan" },
                { value: "Jennifer", label: "Jennifer" },
                { value: "Nicole", label: "Nicole" },
                { value: "Mary", label: "Mary" },
              ]}
            />
          </Col>
          <Col>
            <Select
              mode="multiple"
              style={{ width: "300px", margin: "0 20px" }}
              value={planGroup}
              placeholder="Place Group"
              onChange={handleChangePlanGroup}
              optionLabelProp="label"
            >
              <Option value="OCC" label="OCC">
                <Space>OCC</Space>
              </Option>
              <Option value="MCY" label="MCY">
                <Space>MCY</Space>
              </Option>
              <Option value="OTO" label="OTO">
                <Space>MCY</Space>
              </Option>
              <Option value="INT" label="INT">
                <Space>INT</Space>
              </Option>
              <Option value="AHS" label="AHS">
                <Space>AHS</Space>
              </Option>
              <Option value="HFP" label="HFP">
                <Space>HFP</Space>
              </Option>
              <Option value="SHW" label="SHW">
                <Space>SHW</Space>
              </Option>
            </Select>
          </Col>
          <Col>
            <Button
              onClick={resetValues}
              style={{ backgroundColor: "#1890ff", color: "#FFFFFF" }}
            >
              Save
            </Button>
          </Col>
        </Row>
      </>
    );
  };

  const userTabView = () => {
    return <UserListView />
  }

  const tabViews = [
    {
      label: "Assignment",
      value: "assignment",
      icon: <FolderViewOutlined />,
      children: assignmentView(),
    },
    {
      label: "User",
      value: "user",
      icon: <UsergroupAddOutlined />,
      children: userTabView(),
    },
    {
      label: "Permissions ",
      value: "permissions ",
      icon: <FileProtectOutlined />,
    },
  ];

  return (
    <>
      <Content
        style={{
          padding: 24,
          minHeight: 250,
          background: "#FFFFFF",
        }}
      >
        <Row>
          <Typography.Title level={2}>Administration</Typography.Title>
        </Row>
        <Tabs
          defaultActiveKey="2"
          items={tabViews.map((tabData, i) => {
            return {
              label: (
                <span>
                  {tabData?.icon}
                  {tabData?.label}
                </span>
              ),
              key: tabData?.value,
              children: tabData?.children,
            };
          })}
        />
      </Content>
    </>
  );
};
export default SettingView;
