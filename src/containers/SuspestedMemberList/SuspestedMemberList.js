import React, { useState, useEffect } from "react";
import { Button, Space, Table, Typography, Row } from "antd";
import members_data from "../../data/member_data.json";
import { CheckOutlined } from "@ant-design/icons";
import CsvDownloadButton from "react-json-to-csv";
import diagnosis_data from "../../data/member_diagnosis.json";
import medication_list from "../../data/medication_data.json";

const SuspestedMemberList = () => {
    const tableData = members_data;
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [groupFilter, setGroupFilter] = useState([]);
    const [sweepFilter, setSweepFilter] = useState([]);
    const [auditFilter, setAuditFilter] = useState([]);
    const [pcpNameFilter, setPcpNameFilter] = useState([]);
    const [contractFilter, setContractFilter] = useState([]);
  
    useEffect(() => {
      let filterKeyGroup = [];
      let filterKeyPCP = [];
      let filterKeyContract = [];
      let filterKeyAudit = [];
      let filterKeySweep = [];
      tableData.map((val) => {
        let index = filterKeyGroup.findIndex((i) => i.value === val?.pcp_group);
        let indexPCPName = filterKeyPCP.findIndex(
          (i) => i.value === val?.pcp_prov_name
        );
        let indexContract = filterKeyContract.findIndex(
          (i) => i.value === val?.contract
        );
        let indexAudit = filterKeyAudit.findIndex((i) => i.value === val?.audit);
        let indexSweep = filterKeySweep.findIndex((i) => i.value === val?.sweep);
  
        if (index === -1) {
          filterKeyGroup.push({
            text: val?.pcp_group,
            value: val?.pcp_group,
          });
        }
        if (indexPCPName === -1) {
          filterKeyPCP.push({
            text: val?.pcp_prov_name,
            value: val?.pcp_prov_name,
          });
        }
        if (indexContract === -1) {
          filterKeyContract.push({
            text: val?.contract,
            value: val?.contract,
          });
        }
        if (indexAudit === -1) {
          filterKeyAudit.push({
            text: val?.audit,
            value: val?.audit,
          });
        }
        if (indexSweep === -1) {
          filterKeySweep.push({
            text: val?.sweep,
            value: val?.sweep,
          });
        }
      });
      setPcpNameFilter(filterKeyPCP);
      setGroupFilter(filterKeyGroup);
      setContractFilter(filterKeyContract);
      setSweepFilter(filterKeySweep);
      setAuditFilter(filterKeyAudit);
    }, []);
  
    const handleChange = (pagination, filters, sorter) => {
      console.log("Various parameters", pagination, filters, sorter);
      setFilteredInfo(filters);
      setSortedInfo(sorter);
    };
  
    const clearFilters = () => {
      setFilteredInfo({});
      setSortedInfo({});
    };
  
    const navigateMemberItem = async (id) => {
      await localStorage.setItem(
        "diagnosisData",
        JSON.stringify(diagnosis_data?.filter((member) => member?.id === id))
      );
      await localStorage.setItem(
        "medicationData",
        JSON.stringify(medication_list?.filter((member) => member?.id === id))
      );
      await window.location.assign("/risk-adjustment/members/" + id);
    };
  
    const columns = [
      {
        title: "HICN",
        dataIndex: "pat_id",
        key: "pat_id",
        sorter: (a, b) => a.pat_id.length - b.pat_id.length,
        sortOrder: sortedInfo.columnKey === "pat_id" ? sortedInfo.order : null,
        ellipsis: true,
        width: 100,
        render: (_, record) => (
          <Space size="middle">
            <span
              style={{ color: "steelblue", cursor: "pointer" }}
              onClick={() => navigateMemberItem(record?.id)}
            >
              {record.pat_id}
            </span>
          </Space>
        ),
      },
      // {
      //   title: 'DOB',
      //   dataIndex: 'birth_date',
      //   key: 'birth_date',
      //   sorter: (a, b) => a.birth_date - b.birth_date,
      //   sortOrder: sortedInfo.columnKey === 'birth_date' ? sortedInfo.order : null,
      //   ellipsis: true,
      //   width: 120,
      // },
      {
        title: "Group",
        dataIndex: "pcp_group",
        key: "pcp_group",
        sorter: (a, b) => a.pcp_group.length - b.pcp_group.length,
        sortOrder: sortedInfo.columnKey === "pcp_group" ? sortedInfo.order : null,
        ellipsis: true,
        width: 100,
        filteredValue: filteredInfo.pcp_group || null,
        onFilter: (value, record) => record.pcp_group.includes(value),
        filters: groupFilter,
        filterMode: "menu",
        filterSearch: true,
      },
      {
        title: "Member",
        dataIndex: "pat_name",
        key: "pat_name",
        sorter: (a, b) => a.pat_name.length - b.pat_name.length,
        sortOrder: sortedInfo.columnKey === "pat_name" ? sortedInfo.order : null,
        ellipsis: true,
        width: 150,
      },
      {
        title: "PCP Name",
        dataIndex: "pcp_prov_name",
        key: "pcp_prov_name",
        sorter: (a, b) => a.pcp_prov_name.length - b.pcp_prov_name.length,
        sortOrder:
          sortedInfo.columnKey === "pcp_prov_name" ? sortedInfo.order : null,
        ellipsis: true,
        width: 150,
        filterMode: "menu",
        filterSearch: true,
        filteredValue: filteredInfo.pcp_prov_name || null,
        onFilter: (value, record) => record.pcp_prov_name.includes(value),
        filters: pcpNameFilter,
      },
      {
        title: "HCC",
        dataIndex: "hccrisk",
        key: "hccrisk",
        sorter: (a, b) => a.hccrisk - b.hccrisk,
        sortOrder: sortedInfo.columnKey === "hccrisk" ? sortedInfo.order : null,
        ellipsis: true,
        width: 80,
        render(text, record) {
          return {
            props: {
              style: {
                background:
                  record?.hccrisk < 0.4
                    ? "green"
                    : record?.hccrisk >= 0.4 && record?.hccrisk < 0.8
                    ? "yellow"
                    : "red",
              },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: "HCC Adjusted",
        dataIndex: "hccadjusted",
        key: "hccadjusted",
        sorter: (a, b) => a.hccadjusted - b.hccadjusted,
        sortOrder:
          sortedInfo.columnKey === "hccadjusted" ? sortedInfo.order : null,
        ellipsis: true,
        width: 80,
        render(text, record) {
          return {
            props: {
              style: {
                background:
                  record?.hccadjusted < 0.4
                    ? "green"
                    : record?.hccadjusted >= 0.4 && record?.hccadjusted < 0.8
                    ? "yellow"
                    : "red",
              },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: "Gaps in Care",
        dataIndex: "gaps_count",
        key: "gaps_count",
        sorter: (a, b) => a.gaps_count - b.gaps_count,
        sortOrder:
          sortedInfo.columnKey === "gaps_count" ? sortedInfo.order : null,
        ellipsis: true,
        width: 80,
        render(text, record) {
          return {
            props: {
              style: { background: "lightsteelblue" },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: "Suspected Cnt",
        dataIndex: "suspected_cnt",
        key: "suspected_cnt",
        sorter: (a, b) => a.suspected_cnt - b.suspected_cnt,
        sortOrder:
          sortedInfo.columnKey === "suspected_cnt" ? sortedInfo.order : null,
        ellipsis: true,
        width: 80,
        render(text, record) {
          return {
            props: {
              style: { background: "lightyellow" },
            },
            children: <div>{text}</div>,
          };
        },
      },
  
      // {
      //   title: 'Contract',
      //   dataIndex: 'contract',
      //   key: 'contract',
      //   sorter: (a, b) => a.contract.length - b.contract.length,
      //   sortOrder: sortedInfo.columnKey === 'contract' ? sortedInfo.order : null,
      //   ellipsis: true,
      //   filterMode: 'menu',
      //   filterSearch: true,
      //   filteredValue: filteredInfo.contract || null,
      //   onFilter: (value, record) => record.contract.includes(value),
      //   filters: contractFilter
      // },
      {
        title: "Sweep",
        dataIndex: "sweep",
        key: "sweep",
        sorter: (a, b) => a.sweep < b.sweep,
        sortOrder: sortedInfo.columnKey === "sweep" ? sortedInfo.order : null,
        ellipsis: true,
        render: (_, record) => (
          <Space size="middle">
            {record.sweep === "Y" ? <CheckOutlined /> : ""}
          </Space>
        ),
        width: 80,
        filterMode: "menu",
        filterSearch: true,
        filteredValue: filteredInfo.sweep || null,
        onFilter: (value, record) => record.sweep.includes(value),
        filters: sweepFilter,
      },
      {
        title: "Audit",
        dataIndex: "audit",
        key: "audit",
        sorter: (a, b) => a.audit < b.audit,
        sortOrder: sortedInfo.columnKey === "audit" ? sortedInfo.order : null,
        ellipsis: true,
        render: (_, record) => (
          <Space size="middle">
            {record.audit === "Y" ? <CheckOutlined /> : ""}
          </Space>
        ),
        width: 80,
        filterMode: "menu",
        filterSearch: true,
        filteredValue: filteredInfo.audit || null,
        onFilter: (value, record) => record.audit.includes(value),
        filters: auditFilter,
      },
      {
        title: "Potential",
        dataIndex: "achieved",
        key: "achieved",
        sorter: (a, b) => a.achieved - b.achieved,
        sortOrder: sortedInfo.columnKey === "achieved" ? sortedInfo.order : null,
        ellipsis: true,
        render: (_, record) => (
          <Space size="middle">
            <span>${parseFloat(record.achieved).toLocaleString()}</span>
          </Space>
        ),
      },
      {
        title: "Achieved",
        dataIndex: "potential",
        key: "potential",
        sorter: (a, b) => a.potential - b.potential,
        sortOrder: sortedInfo.columnKey === "potential" ? sortedInfo.order : null,
        ellipsis: true,
        render: (_, record) => (
          <Space size="middle">
            <span>${parseFloat(record.potential).toLocaleString()}</span>
          </Space>
        ),
      },
      {
        title: "Reviewer",
        dataIndex: "reviewer",
        key: "reviewer",
        sorter: (a, b) => a.reviewer.length - b.reviewer.length,
        sortOrder: sortedInfo.columnKey === "reviewer" ? sortedInfo.order : null,
        ellipsis: true,
      },
      {
        title: "MLR Report",
        dataIndex: "mlrperc",
        key: "mlrperc",
        sorter: (a, b) => a.mlrperc - b.mlrperc,
        sortOrder: sortedInfo.columnKey === "mlrperc" ? sortedInfo.order : null,
        ellipsis: true,
      },
    ];
  
    return (
      <>
        <Row justify="space-between">
          <Typography.Title level={2}>
            Suspected Member List
          </Typography.Title>
          <Space style={{ marginBottom: 16, float: "right" }}>
            {(filteredInfo?.contract?.length > 0 ||
              filteredInfo?.pcp_group?.length > 0 ||
              filteredInfo?.pcp_prov_name?.length > 0) && (
              <Button onClick={clearFilters}>Clear filters</Button>
            )}
            <CsvDownloadButton
              data={tableData}
              filename="Member_List.csv"
              delimiter=","
              style={{
                backgroundColor: "#1890ff",
                cursor: "pointer",
                border: "none",
                height: "35px",
                width: "80px",
                color: "#FFFFFF",
              }}
            >
              Export
            </CsvDownloadButton>
          </Space>
        </Row>
        <Table
          className="table-striped-rows"
          bordered
          columns={columns}
          dataSource={tableData}
          onChange={handleChange}
          colorFillAlter="#1677ff"
        />
      </>
    );
}

export default SuspestedMemberList;