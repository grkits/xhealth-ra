import {
  Select,
  Space,
  Row,
  Col,
  Typography,
  Checkbox,
  Button,
  Layout,
  Table,
} from "antd";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import reportData from "../../data/reports_meta.json";
import reportDataSource from "../../data/reports_data.json";
import CsvDownloadButton from "react-json-to-csv";
const { Content } = Layout;

export const stackData = [
  [
    "Month",
    "Assigned",
    "Completed",
  ],
  ["Beth", 980, 738],
  ["Mary", 1000, 820],
  ["Susan", 820, 710],
  ["Nicole", 977, 810],
  ["Jennifer", 1015, 891],
];

export const stackOptions = {
  title: "Monthly Assigned vs Audited",
  vAxis: { title: "Member Count" },
  hAxis: { title: "Reviewer / Coder" },
  legend: { position: 'top', maxLines: 3 },
  seriesType: "bars",
  series: { 5: { type: "line" } },
  axes: {
    x: {
      0: { side: 'top' }
    }
  }
};

const Reports = () => {
  const [reportCategory, setReportCategory] = useState([]);
  const [reportCategoryVal, setReportCategoryVal] = useState(null);
  const [reportType, setReportType] = useState([]);
  const [reportOptions, setReportOptions] = useState([
    { value: "Chart", label: "Chart" },
    { value: "Table", label: "Table" },
  ]);
  const [chartTyp, setChartTyp] = useState(null);
  const [reportTypeVal, setReportTypeVal] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    let result = reportData.filter(
      (data, index) =>
        index ===
        reportData.findIndex(
          (other) => data.report_category === other.report_category
        )
    );
    let categoryArr = [];
    result.map((obj) => {
      categoryArr.push({
        value: obj?.report_category,
        label: obj?.report_category,
      });
    });
    setReportCategory(categoryArr);
  }, []);

  const reportColumns = [
    {
      title: "Patient Number",
      dataIndex: "pat_id",
      key: "pat_id",
      ellipsis: true,
      width: 150,
    },
    {
      title: "DIAGCD",
      dataIndex: "diagcd",
      key: "diagcd",
      ellipsis: true,
    },
    {
      title: "Date of Service",
      dataIndex: "dateOfService",
      key: "dateOfService",
      ellipsis: true,
      width: 150,
    },
    {
      title: "Query Type",
      dataIndex: "query_type",
      key: "query_type",
      ellipsis: true,
    },
    {
      title: "Auditor Note",
      dataIndex: "auditor_notes",
      key: "auditor_notes",
      ellipsis: true,
      width: 150,
    },
    {
      title: "Query Text",
      dataIndex: "query_text",
      key: "query_text",
      ellipsis: true,
      width: 150,
    },
    {
      title: "PCP",
      dataIndex: "pcp",
      key: "pcp",
      ellipsis: true,
      width: 150,
    },
    {
      title: "Audited",
      dataIndex: "audited",
      key: "audited",
      ellipsis: true,
    },
    {
      title: "Audited Date",
      dataIndex: "dateAudited",
      key: "dateAudited",
      ellipsis: true,
      width: 150,
    },
  ];

  const handleChange = (value) => {
    setShowTable(false);
    setShowChart(false);
    setReportCategoryVal(value);
    let reportTypeArr = reportData.filter((data, index) => {
      return data?.report_category === value;
    });
    let result = reportTypeArr.filter(
      (data, index) =>
        index ===
        reportTypeArr.findIndex(
          (other) => data.report_name === other.report_name
        )
    );
    let typeArr = [];
    result.map((obj) => {
      typeArr.push({ value: obj?.report_name, label: obj?.report_name });
    });
    setReportTypeVal(null);
    setReportType(typeArr);
    setChartTyp(null);
  };

  const handleChangeReport = (value) => {
    setReportTypeVal(value);
    setShowTable(false);
    setShowChart(false);
  };

  const handleChangeReportType = (value) => {
    setChartTyp(value);
  };

  const onChangeCheckbox = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const generateReport = () => {
    if (chartTyp === "Table") {
      setShowTable(true);
      setShowChart(false)
    } else {
      setShowTable(false)
      setShowChart(true);
    }
  };

  return (
    <>
      <Content
        style={{
          padding: 24,
          minHeight: 500,
          background: "#FFFFFF",
        }}
      >
        <Row>
          <Typography.Title level={2}>Reports</Typography.Title>
        </Row>
        <Row style={{ margin: "20px 0" }}>
          <Select
            value={reportCategoryVal}
            style={{ width: 400 }}
            onChange={handleChange}
            allowClear
            placeholder="Report Category"
            options={reportCategory}
          />
        </Row>
        <Row style={{ margin: "20px 0" }}>
          <Select
            value={reportTypeVal}
            style={{ width: 400 }}
            onChange={handleChangeReport}
            allowClear
            placeholder="Report Category"
            options={reportType}
          />
        </Row>
        <Row style={{ margin: "20px 0" }}>
          <Select
            value={chartTyp}
            style={{ width: 400 }}
            onChange={handleChangeReportType}
            allowClear
            placeholder="Report Type"
            options={reportOptions}
          />
        </Row>
        <Row>
          <Col span={4}>
            <Checkbox onChange={onChangeCheckbox}>Include Un-assigned</Checkbox>
          </Col>
          <Col span={4}>
            <Button
              style={{ backgroundColor: "#1890ff", color: "#FFFFFF" }}
              onClick={generateReport}
            >
              Generate Report
            </Button>
          </Col>
        </Row>
        <Row justify={"end"}>
          <Space>
            <CsvDownloadButton
              data={reportDataSource}
              filename="Reports.csv"
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
        {showTable && (
          <Row style={{ margin: "20px 0" }}>
            <Table
              className="table-striped-rows"
              bordered
              pagination={{ hideOnSinglePage: true }}
              columns={reportColumns}
              dataSource={reportDataSource}
              onChange={handleChange}
              colorFillAlter="#1677ff"
            />
          </Row>
        )}
        {showChart && (
          <Chart
          chartType="ComboChart"
          width="100%"
          height="100%"
          data={stackData}
          options={stackOptions}
        />
        )}
      </Content>
    </>
  );
};
export default Reports;
