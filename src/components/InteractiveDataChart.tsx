import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Define a generic data type, adjust as needed for specific charts
type ChartDataItem = {
  name: string;
  [key: string]: string | number; // Allow other data keys
};

interface InteractiveDataChartProps {
  data: ChartDataItem[];
  chartType?: 'bar' | 'line';
  title?: string;
  description?: string;
  dataKeys: { key: string; color: string; name?: string }[]; // key for data, color for bar/line
  xAxisKey: string; // key for X-axis labels from data
  className?: string;
}

const InteractiveDataChart: React.FC<InteractiveDataChartProps> = ({
  data,
  chartType = 'bar',
  title,
  description,
  dataKeys,
  xAxisKey,
  className,
}) => {
  console.log("Rendering InteractiveDataChart:", title, "Type:", chartType);

  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-gray-500">No data available to display chart.</p>
        </CardContent>
      </Card>
    );
  }
  
  const ChartComponent = chartType === 'line' ? LineChart : BarChart;

  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ChartComponent data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey={xAxisKey} stroke="#666" fontSize={12} />
            <YAxis stroke="#666" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px' }}
              labelStyle={{ fontWeight: 'bold', color: '#333' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }}/>
            {dataKeys.map((dk) => 
                chartType === 'line' ? (
                    <Line key={dk.key} type="monotone" dataKey={dk.key} name={dk.name || dk.key} stroke={dk.color} strokeWidth={2} activeDot={{ r: 6 }} />
                ) : (
                    <Bar key={dk.key} dataKey={dk.key} name={dk.name || dk.key} fill={dk.color} radius={[4, 4, 0, 0]} />
                )
            )}
          </ChartComponent>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default InteractiveDataChart;