import {
  Input,
  Row,
  Col,
  Switch,
  Select,
  Button,
  Modal,
  Table,
  Space,
} from "antd";
import React, { useState } from "react";

const UserListView = () => {
  const [state, setState] = useState({
    userName: null,
    firstName: null,
    lastName: null,
    email: null,
    role: null,
    active: true,
  });
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [indexTab, setIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [userTableData, setUserTableData] = useState(
    localStorage.getItem("userTabData")
      ? JSON.parse(localStorage.getItem("userTabData"))
      : []
  );

  const addUserData = async () => {
    let arr = userTableData;
    await arr.unshift({ ...state });
    await setUserTableData([...arr]);
    await localStorage.setItem("userTabData", JSON.stringify([...arr]));
    await setState({
      userName: null,
      firstName: null,
      lastName: null,
      email: null,
      role: null,
      active: true,
    });
  };

  const editUser = async () => {
    let arr = userTableData;
    arr[indexTab] = { ...state };
    await setUserTableData([...arr]);
    await localStorage.setItem("userTabData", JSON.stringify([...arr]));
    await setState({
      userName: null,
      firstName: null,
      lastName: null,
      email: null,
      role: null,
      active: true,
    });
  };

  const showModal = (type) => {
    if (type === "edit") {
      setModalType("edit");
    } else {
      setModalType("add");
    }
    setOpen(true);
  };

  const handleChange = (value) => {
    setState({ ...state, role: value });
  };

  const handleChangeInput = (e, key) => {
    setState({
      ...state,
      [key]: e.target.value,
    });
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(async () => {
      if (modalType === "edit") {
        await editUser();
      } else {
        await addUserData();
      }
      await setLoading(false);
      await setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChangeTableFilter = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const userDataColumns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      ellipsis: true,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      ellipsis: true,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
      render: (text, record, index) => (
        <Space size="middle">
          <Switch
            checked={record?.active}
            checkedChildren="Active"
            unCheckedChildren="InActive"
            disabled
            onChange={() => {
              let arr = [...userTableData];
              arr[index].active = !record?.active;
              setUserTableData([...arr]);
              localStorage.setItem("userTabData", JSON.stringify([...arr]));
            }}
          />
        </Space>
      ),
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      ellipsis: true,
      render: (text, record, index) => (
        <Space size="middle">
          <span
            style={{ color: "steelblue", cursor: "pointer" }}
            onClick={() => {
              setState({ ...state, ...record });
              setIndex(index);
              showModal("edit");
            }}
          >
            Edit
          </span>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => showModal("add")}>
        + Add User
      </Button>
      <Modal
        open={open}
        title={modalType === "edit" ? "Edit User" : "Add User"}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            {modalType === "edit" ? "Save" : "Submit"}
          </Button>,
        ]}
      >
        <Row style={{ margin: "20px 0" }}>
          <Col span={5}>User Name: </Col>
          <Col>
            <Input
              placeholder="User Name"
              onChange={(e) => handleChangeInput(e, "userName")}
              value={state?.userName}
            />
          </Col>
        </Row>
        <Row style={{ margin: "20px 0" }}>
          <Col span={5}>First Name: </Col>
          <Col>
            <Input
              placeholder="First Name"
              onChange={(e) => handleChangeInput(e, "firstName")}
              value={state?.firstName}
            />
          </Col>
        </Row>
        <Row style={{ margin: "20px 0" }}>
          <Col span={5}>Last Name: </Col>
          <Col>
            <Input
              placeholder="Last Name"
              onChange={(e) => handleChangeInput(e, "lastName")}
              value={state?.lastName}
            />
          </Col>
        </Row>
        <Row style={{ margin: "20px 0" }}>
          <Col span={5}>Email: </Col>
          <Col>
            <Input
              placeholder="Email"
              onChange={(e) => handleChangeInput(e, "email")}
              value={state?.email}
            />
          </Col>
        </Row>
        <Row style={{ margin: "20px 0" }}>
          <Col span={5}>Role: </Col>
          <Col>
            <Select
              style={{ width: 185 }}
              onChange={handleChange}
              value={state?.role}
              options={[
                { value: "admin", label: "Admin" },
                { value: "auditor", label: "Aduditor" },
              ]}
            />
          </Col>
        </Row>
        <Row style={{ margin: "20px 0" }}>
          <Col span={5}>Activate: </Col>
          <Col>
            <Switch
              checked={state?.active}
              checkedChildren="Active"
              unCheckedChildren="InActive"
              onChange={() => {
                setState({ ...state, active: !state?.active });
              }}
            />
          </Col>
        </Row>
      </Modal>
      <Row style={{ margin: "20px 0" }}>
        <Table
          className="table-striped-rows"
          bordered
          columns={userDataColumns}
          dataSource={userTableData}
          onChange={handleChangeTableFilter}
          colorFillAlter="#1677ff"
        />
      </Row>
    </>
  );
};

export default UserListView;
