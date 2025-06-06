import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react'; // For typing the icon prop

interface DashboardWidgetCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon; // Optional: Icon component from lucide-react
  iconBgColor?: string; // Optional: Tailwind class for icon background
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
  className?: string;
}

const DashboardWidgetCard: React.FC<DashboardWidgetCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  iconBgColor = 'bg-sky-100',
  trend,
  className,
}) => {
  console.log("Rendering DashboardWidgetCard:", title);

  const trendColor = trend?.direction === 'up' ? 'text-green-600' : trend?.direction === 'down' ? 'text-red-600' : 'text-gray-500';

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        {Icon && (
          <div className={`p-2 rounded-md ${iconBgColor}`}>
            <Icon className="h-5 w-5 text-sky-600" /> {/* Primary color for icon */}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        {description && <p className="text-xs text-gray-500 pt-1">{description}</p>}
        {trend && (
          <p className={`text-xs ${trendColor} pt-1`}>
            {trend.value}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardWidgetCard;