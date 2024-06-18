import { Chart } from "react-google-charts";

function LineChart({data, options}) {
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="300px"
      data={data}
      options={options}
    />
  );
}
export default LineChart
