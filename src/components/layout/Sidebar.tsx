import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Link } from 'react-router-dom'; // Assuming react-router-dom
// Example icons
import { Home, CreditCard, Users, Settings } from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  console.log("Rendering Sidebar");

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/account-overview", label: "Accounts", icon: CreditCard },
    { href: "/joint-account-creation", label: "Joint Account", icon: Users },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className={`w-64 bg-gray-50 border-r border-gray-200 flex flex-col ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
      </div>
      <ScrollArea className="flex-grow">
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-200 hover:text-gray-900 transition-colors duration-150"
              // Add active link styling if react-router-dom NavLink is used
            >
              <item.icon className="mr-3 h-5 w-5 text-gray-500" />
              {item.label}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <Separator />
      <div className="p-4 text-sm text-gray-500">
        {/* Footer content for sidebar, e.g., App version or help link */}
        App Version 1.0.0
      </div>
    </aside>
  );
};

export default Sidebar;