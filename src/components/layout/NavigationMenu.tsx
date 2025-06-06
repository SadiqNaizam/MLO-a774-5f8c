import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Button } from '@/components/ui/button';
import { LayoutDashboard, LogOut, UserCircle, Settings, Mail } from 'lucide-react'; // Example icons

interface NavigationMenuProps {
  userName?: string;
  onLogout?: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ userName, onLogout }) => {
  console.log("Rendering NavigationMenu");

  // Define primary color from user journey (e.g., #00A8E1 - using sky-600 as an example)
  const primaryColor = "bg-sky-600 hover:bg-sky-700";
  const primaryTextColor = "text-sky-600";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className={`text-xl font-bold ${primaryTextColor}`}>
              MyApp // Replace with Logo/Brand
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" className="text-gray-700 hover:bg-gray-100">
                <LayoutDashboard className="mr-2 h-5 w-5" /> Dashboard
              </Button>
            </Link>
            {/* Example: Button for initiating joint account creation from user journey */}
            <Link to="/joint-account-creation">
              <Button className={`${primaryColor} text-white`}>
                Open Joint Account
              </Button>
            </Link>
            <Link to="/payments">
              <Button variant="ghost" className="text-gray-700 hover:bg-gray-100">
                <Mail className="mr-2 h-5 w-5" /> Payments
              </Button>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            {userName && <span className="text-sm text-gray-600">Welcome, {userName}</span>}
            <Link to="/account-overview">
              <Button variant="ghost" size="icon" aria-label="Account">
                <UserCircle className="h-6 w-6 text-gray-600" />
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="ghost" size="icon" aria-label="Settings">
                <Settings className="h-6 w-6 text-gray-600" />
              </Button>
            </Link>
            {onLogout && (
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            )}
          </div>
          <div className="md:hidden flex items-center">
            {/* Mobile menu button - implementation needed */}
            <Button variant="ghost" size="icon">
              {/* <Menu className="h-6 w-6" /> */}
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile menu dropdown - implementation needed */}
    </nav>
  );
};

export default NavigationMenu;