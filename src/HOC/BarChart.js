import React from "react";
import { Chart } from "react-google-charts";

function BarChart({data, options}) {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="300px"
      data={data}
      options={options}
    />
  );
}

export default BarChart;