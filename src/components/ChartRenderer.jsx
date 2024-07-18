import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const ChartRenderer = ({ chartType, data, options }) => {
  const chartComponents = {
    bar: Bar,
    line: Line,
    pie: Pie,
    scatter: Scatter,
  };

  const ChartComponent = chartComponents[chartType];

  if (!ChartComponent) {
    return <div>Unsupported chart type</div>;
  }

  return <ChartComponent data={data} options={options} />;
};

export default ChartRenderer;