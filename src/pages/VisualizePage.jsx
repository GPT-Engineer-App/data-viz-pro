import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { BarChart, LineChart, PieChart, ScatterPlot } from 'lucide-react';

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
            <p className="text-muted-foreground">Chart preview will be displayed here</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Data Mapping</h2>
        <div className="border rounded-lg p-4">
          <p className="text-muted-foreground mb-4">Drag and drop data columns to map them to chart properties</p>
          {/* Placeholder for drag-and-drop interface */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded p-2">
              <h3 className="font-medium mb-2">Available Columns</h3>
              <ul className="space-y-2">
                <li className="bg-muted p-2 rounded cursor-move">Column A</li>
                <li className="bg-muted p-2 rounded cursor-move">Column B</li>
                <li className="bg-muted p-2 rounded cursor-move">Column C</li>
              </ul>
            </div>
            <div className="border rounded p-2">
              <h3 className="font-medium mb-2">Chart Properties</h3>
              <ul className="space-y-2">
                <li className="bg-muted p-2 rounded">X-Axis</li>
                <li className="bg-muted p-2 rounded">Y-Axis</li>
                <li className="bg-muted p-2 rounded">Color</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Button className="mt-6">Generate Visualization</Button>
    </div>
  );
};

export default VisualizePage;