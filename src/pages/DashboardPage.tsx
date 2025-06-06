import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Sidebar from '@/components/layout/Sidebar'; // Custom Sidebar
import DashboardWidgetCard from '@/components/DashboardWidgetCard';
import InteractiveDataChart from '@/components/InteractiveDataChart';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { DollarSign, Users, CreditCard, TrendingUp, PlusCircle } from 'lucide-react';

// Sample data for charts and widgets
const sampleChartData = [
  { name: 'Jan', income: 4000, expenses: 2400 },
  { name: 'Feb', income: 3000, expenses: 1398 },
  { name: 'Mar', income: 5000, expenses: 3800 },
  { name: 'Apr', income: 4780, expenses: 2908 },
  { name: 'May', income: 5890, expenses: 4800 },
  { name: 'Jun', income: 4390, expenses: 3800 },
];

const DashboardPage = () => {
  console.log('DashboardPage loaded');

  const handleLogout = () => {
    console.log('Logout initiated');
    // Add actual logout logic here (e.g., clear token, redirect to login)
    localStorage.removeItem('authToken');
    // Ideally, you'd use useNavigate from react-router-dom here
    // For simplicity, window.location, but navigate is better in a real app.
    window.location.href = '/login';
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <NavigationMenu userName="John Doe" onLogout={handleLogout} />
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
          <Sidebar className="h-full" />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <ScrollArea className="h-full p-6">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600">Welcome back, John! Here's your financial overview.</p>
            </header>

            {/* Quick Actions */}
            <section className="mb-8">
                <div className="flex space-x-4">
                    <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                        <PlusCircle className="mr-2 h-5 w-5" /> Make a Payment
                    </Button>
                    <Button variant="outline">
                        Transfer Funds
                    </Button>
                     <Button variant="outline" onClick={() => window.location.href='/joint-account-creation'}>
                        Open Joint Account
                    </Button>
                </div>
            </section>

            {/* Widget Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <DashboardWidgetCard
                title="Total Balance"
                value="$25,780.50"
                description="Across all accounts"
                icon={DollarSign}
                iconBgColor="bg-green-100"
                trend={{ value: "+5.2% from last month", direction: 'up' }}
              />
              <DashboardWidgetCard
                title="Savings Account"
                value="$10,250.00"
                description="Annual interest: 1.5%"
                icon={TrendingUp}
                iconBgColor="bg-yellow-100"
              />
              <DashboardWidgetCard
                title="Checking Account"
                value="$5,530.50"
                description="Available balance"
                icon={CreditCard}
                iconBgColor="bg-blue-100"
              />
              <DashboardWidgetCard
                title="Joint Account Holders"
                value="2"
                description="Active Users"
                icon={Users}
                iconBgColor="bg-purple-100"
              />
            </section>

            {/* Data Visualizations */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InteractiveDataChart
                title="Monthly Cash Flow"
                description="Income vs. Expenses over the last 6 months"
                data={sampleChartData}
                chartType="bar"
                xAxisKey="name"
                dataKeys={[
                  { key: 'income', color: '#34d399', name: 'Income' }, // emerald-400
                  { key: 'expenses', color: '#fb7185', name: 'Expenses' }, // rose-400
                ]}
                className="shadow-lg rounded-lg"
              />
              <InteractiveDataChart
                title="Investment Growth"
                description="Portfolio performance"
                 data={[
                    { name: 'Q1', value: 10000 },
                    { name: 'Q2', value: 12000 },
                    { name: 'Q3', value: 11500 },
                    { name: 'Q4', value: 13500 },
                  ]}
                chartType="line"
                xAxisKey="name"
                dataKeys={[{ key: 'value', color: '#60a5fa', name: 'Portfolio Value' }]} // blue-400
                className="shadow-lg rounded-lg"
              />
            </section>
            <footer className="mt-12 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} MyApp Financials. All rights reserved.
            </footer>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default DashboardPage;