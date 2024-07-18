import { Bar, Line, Pie, Scatter, Doughnut, PolarArea, Radar, Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const ChartRenderer = ({ chartType, data, options }) => {
  const chartComponents = {
    bar: Bar,
    line: Line,
    pie: Pie,
    scatter: Scatter,
    area: Line, // Area chart is a variation of Line chart
    doughnut: Doughnut,
    polarArea: PolarArea,
    radar: Radar,
    bubble: Bubble,
  };

  const ChartComponent = chartComponents[chartType];

  if (!ChartComponent) {
    return <div>Unsupported chart type</div>;
  }

  // Adjust data and options based on chart type
  let adjustedData = { ...data };
  let adjustedOptions = { ...options };

  if (chartType === 'area') {
    adjustedData.datasets = adjustedData.datasets.map(dataset => ({
      ...dataset,
      fill: true,
    }));
  }

  if (chartType === 'pie' || chartType === 'doughnut' || chartType === 'polarArea') {
    delete adjustedOptions.scales;
  }

  return <ChartComponent data={adjustedData} options={adjustedOptions} />;
};

export default ChartRenderer;