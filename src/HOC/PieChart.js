import React from "react";
import { Chart } from "react-google-charts";

function PieChart({ diffdata, data, options }) {
  return (
    <Chart
      chartType="PieChart"
      diffdata={diffdata}
      data={data}
      options={options}
      width={"100%"}
      height={"300px"}
    />
  );
}

export default PieChart;
