import { Col, Row, Space, Typography } from "antd";
import LineChart from "../../HOC/LineChart";
import "./RiskDashboard.css";
import PieChart from "../../HOC/PieChart";

const { Title } = Typography;
const membersProcessed = {
  data: [
    ["Day", "Sales"],
    ["M", 10],
    ["T", 11],
    ["W", 6],
    ["T", 4],
    ["F", 5],
  ],
  options: {
    title: "Company Performance",
    legend: { position: "bottom" },
  },
};

const gapsClosed = {
  data: [
    ["Day", "Sales"],
    ["M", 10],
    ["T", 11],
    ["W", 6],
    ["T", 4],
    ["F", 5],
  ],
  options: {
    title: "Company Performance",
    legend: { position: "bottom" },
  },
};

const queriesSubmitted = {
  data: [
    ["Day", "Sales"],
    ["M", 10],
    ["T", 11],
    ["W", 6],
    ["T", 4],
    ["F", 5],
  ],
  options: {
    title: "Company Performance",
    legend: { position: "bottom" },
  },
};

const riskData = {
  riskTrendData: [
    ["Month", "HCC", "Adjusted HCC"],
    ["Jan", 1.194, 1.420],
    ["Feb", 1.185, 1.422],
    ["Mar", 1.171, 1.425],
    ["Apr", 1.227, 1.432],
    ["May", 1.223, 1.438],
    ["Jun", 1.24, 1.488],
    ["Jul", 1.28, 1.536],
    ["Aug", 1.266, 1.519],
    ["Sep", 1.294, 1.553],
    ["Oct", 1.299, 1.559],
    ["Nov", 1.296, 1.555],
    ["Dec", 1.307, 1.568],
  ],
  options: {
    title: "HCC vs Adjusted HCC",
    legend: { position: "bottom" },
  },
}

const providerActions = {
  riskTrendData: [
    ["Plan", "Percentage"],
    ["Accepted", 10000],
    ["Held", 4000],
    ["Ignored", 900],
    ["Rejected", 1500],
  ],
  options: {
    title: "Provider Actions(current reporting period)",
    colors: ['#41ac89', '#2b9b38', '#b3b300', '#D9C022', '#bab673'],
    legend: { position: "side" },
    isStacked: true,
  },
}

const revenueOpportunity = {
  data: [
    ["Month", "Paid", "Adjusted"],
    ["Jan", 1194, 1320],
    ["Feb", 1185, 1372],
    ["Mar", 1171, 1325],
    ["Apr", 1227, 1432],
    ["May", 1123, 1338],
    ["Jun", 1140, 1388],
    ["Jul", 1180, 1400],
    ["Aug", 1266, 1519],
    ["Sep", 1294, 1553],
    ["Oct", 1199, 1559],
    ["Nov", 1196, 1555],
    ["Dec", 1307, 1568],
  ],
  options: {
    title: "PMPM Paid vs Adjusted Expected (Revenue)",
    legend: { position: "bottom" },
  },
}

const revenueOpportunity2 = {
  data: [
    ["Day", "Sales"],
    ["M", 10],
    ["T", 11],
    ["W", 6],
    ["T", 4],
    ["F", 5],
  ],
  options: {
    title: "Company Performance",
    legend: { position: "bottom" },
  },
};

function BottomDisk() {
  return (
    <>
    <div style={{backgroundColor: "#fff", padding: "20px"}}>
      <Row justify={"end"}>
        <Col span={6}>
          <Title className="bottom-disk-title" level={4}>
            Members Processed
          </Title>
          <Title className="title-sup-class">1247<sup className="sup-color-class">25%</sup></Title>
        </Col>
        <Col span={6}>
          <Title className="bottom-disk-title" level={4}>
            Gaps Closed
          </Title>
          <Title className="title-sup-class">762<sup className="sup-color-class">41%</sup></Title>
        </Col>
        <Col span={6}>
          <Title className="bottom-disk-title" level={4}>
            Queries Submitted
          </Title>
          <Title className="title-sup-class">1512<sup className="sup-color-class">57%</sup></Title>
        </Col>
        <Col span={6}>
          <Title className="bottom-disk-title" level={4}>
            Revenue Opportunity
          </Title>
          <Title className="title-sup-class"><sup className="sup-color-class">$</sup>1.07m</Title>
        </Col>
      </Row>
      </div>
      <Row>
        <Col span={8}>
          <PieChart
            data={providerActions?.riskTrendData}
            options={providerActions?.options}
          />
        </Col>
        <Col span={8}>
          <LineChart
            data={riskData?.riskTrendData}
            options={riskData?.options}
          />
        </Col>
        <Col span={8}>
          <LineChart
            data={revenueOpportunity?.data}
            options={revenueOpportunity?.options}
          />
        </Col>
      </Row>
    </>
  );
}
export default BottomDisk;
