import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { BarChart, LineChart, PieChart, ScatterPlot } from 'lucide-react';
import DataMappingDnD from '@/components/DataMappingDnD';
import ChartRenderer from '@/components/ChartRenderer';

const VisualizePage = () => {
  const [chartType, setChartType] = useState('bar');
  const [colorPalette, setColorPalette] = useState('default');
  const [fontSize, setFontSize] = useState(12);
  const [showLegend, setShowLegend] = useState(true);

  const chartTypes = [
    { value: 'bar', label: 'Bar Chart', icon: BarChart },
    { value: 'line', label: 'Line Chart', icon: LineChart },
    { value: 'pie', label: 'Pie Chart', icon: PieChart },
    { value: 'scatter', label: 'Scatter Plot', icon: ScatterPlot },
  ];

  const colorPalettes = [
    { value: 'default', label: 'Default' },
    { value: 'pastel', label: 'Pastel' },
    { value: 'vibrant', label: 'Vibrant' },
    { value: 'monochrome', label: 'Monochrome' },
  ];

  // Sample data for the DataMappingDnD component
  const availableColumns = ['Column A', 'Column B', 'Column C', 'Column D', 'Column E'];
  const chartProperties = ['X-Axis', 'Y-Axis', 'Color', 'Size'];

  // Sample data for chart rendering
  const chartData = useMemo(() => ({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sample Data',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }), []);

  const chartOptions = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        display: showLegend,
      },
      title: {
        display: true,
        text: 'Sample Chart',
        font: {
          size: fontSize,
        },
      },
    },
  }), [showLegend, fontSize]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Visualize Data</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="chart-type">Chart Type</Label>
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger id="chart-type">
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>
              <SelectContent>
                {chartTypes.map(({ value, label, icon: Icon }) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex items-center">
                      <Icon className="mr-2 h-4 w-4" />
                      {label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="color-palette">Color Palette</Label>
            <Select value={colorPalette} onValueChange={setColorPalette}>
              <SelectTrigger id="color-palette">
                <SelectValue placeholder="Select color palette" />
              </SelectTrigger>
              <SelectContent>
                {colorPalettes.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="font-size">Font Size</Label>
            <Slider
              id="font-size"
              min={8}
              max={24}
              step={1}
              value={[fontSize]}
              onValueChange={(value) => setFontSize(value[0])}
            />
            <div className="mt-1 text-sm text-muted-foreground">{fontSize}px</div>
          </div>

          <div className="flex items-center space-x-2">
            <Input
              id="show-legend"
              type="checkbox"
              checked={showLegend}
              onCheckedChange={setShowLegend}
            />
            <Label htmlFor="show-legend">Show Legend</Label>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Chart Preview</h2>
          <div className="aspect-video bg-muted flex items-center justify-center">
            <ChartRenderer chartType={chartType} data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Data Mapping</h2>
        <div className="border rounded-lg p-4">
          <p className="text-muted-foreground mb-4">Drag and drop data columns to map them to chart properties</p>
          <DataMappingDnD availableColumns={availableColumns} chartProperties={chartProperties} />
        </div>
      </div>

      <Button className="mt-6">Generate Visualization</Button>
    </div>
  );
};

export default VisualizePage;