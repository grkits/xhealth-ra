import BarChart from "../../HOC/BarChart";
import LineChart from "../../HOC/LineChart";
import PieChart from "../../HOC/PieChart";
import BottomDisk from "./BottomDisk";
import { Chart } from "react-google-charts";
import { Col, Row, Typography } from "antd";


const pieDataNew = [
  ["Plan", "Population"],
  ["Medicare", 10000],
  ["Comm", 7000],
  ["Emp", 3000],
  ["VBC", 8000],
];

const pieDataOld = [
  ["Plan", "Population"],
  ["Medicare", 2000],
  ["Comm", 1400],
  ["Emp", 600],
  ["VBC", 1600],
];

export const pieDiffdata = {
  old: pieDataOld,
  new: pieDataNew,
};

const data = [
  ["Plan", "Population"],
  ["Medicare", 10000],
  ["Comm", 7667],
  ["Emp", 3160],
  ["VBC", 10791],
];

const chronicData = [
  ["1", "Hypertension", "11775"],
  ["2", "Osteoporosis", "337"],
  ["3", "Anxiety Disorder", "4840"],
  ["4", "CHF", "6574"],
  ["5", "Depression", "8525"],
  ["6", "COPD", "9478"],
  ["7", "Asthma", "10993"],
  ["8", "CAD", "11966"],
  ["9", "Diabetes", "12432"],
  ["10", "Renal Disease", "1485"],
  ["11", "Joint Disorders", "6946"],
];

const options = {
  title: "Monthly RAF Population by Plan",
  legend: "Plan",
  pieSliceText: "label",
  legend: { position: "side" },
  isStacked: true,
};

const barData = [
  [
    "Element",
    "Density",
    { role: "style" },
    {
      sourceColumn: 0,
      role: "annotation",
      type: "string",
      calc: "stringify",
    },
  ],
  ["Beth", 8.94, "#b87333", null],
  ["Mary", 10.49, "silver", null],
  ["Jennifer", 19.3, "gold", null],
  ["Platinum", 21.45, "color: #e5e4e2", null],
];

const barOptions = {
  title: "Density of Precious Metals, in g/cm^3",
  width: "25%",
  height: 300,
  legend: { position: "none" },
};

const LineChartdata = [
  ["Year", "HCC", "HCC Chronic"],
  ["Q1", 1.194, 1.433],
  ["Q2", 1.227, 1.472],
  ["Q3", 1.28, 1.536],
  ["Q4", 1.299, 1.559],
];

const LineChartoptions = {
  title: "Risk Trends",
  legend: { position: "bottom" },
};

const LineChartdata2 = [
  ["Year", "Sales", "Expenses"],
  ["2004", 10, 20],
  ["2005", 10, 40],
  ["2006", 50, 30],
  ["2007", 10, 50],
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

const LineChartoptions2 = {
  title: "Company Performance",
  legend: { position: "bottom" },
};

export const barChartData = [
  ["Chronic", "Patient Count"],
  ["Osteoporosis", 337],
  ["Renal Disease", 1485],
  ["Anxiety Disorder", 4840],
  ["CHF", 6574],
  ["Joint Disorders", 6946],
  ["Depression", 8525],
  ["COPD", 9478],
  ["Asthma", 6993],
  ["Hypertension", 7775],
  ["CAD", 8966],
  ["Diabetes", 9432],
];

export const barchartOptions = {
  title: "Chronic Conditions",
  vAxis: { title: "Chronic" },
  hAxis: { title: "Patient Count" },
  legend: { position: "bottom" },
};

function RiskDashboard() {
  return (
    <>
      <Row>
        <Typography.Title level={2}>Risk Adjustment Dashboard</Typography.Title>
      </Row>
      <Row>
        <Col span={8}>
          <PieChart diffdata={pieDiffdata}
            options={options} />
        </Col>
        <Col span={10}>
          <Chart
            chartType="ComboChart"
            width="100%"
            height="100%"
            data={stackData}
            options={stackOptions}
          />
        </Col>
        <Col span={6}>
          <Chart
            chartType="BarChart"
            width="100%"
            height="100%"
            data={barChartData}
            options={barchartOptions}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <BottomDisk />
        </Col>
      </Row>
    </>
  );
}
export default RiskDashboard;
