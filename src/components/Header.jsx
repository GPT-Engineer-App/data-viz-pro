import { Package2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserMenu } from "./UserMenu";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <NavLink to="/" className="flex items-center space-x-2 mr-6">
          <Package2 className="h-6 w-6" />
          <span className="font-bold">DataViz Pro</span>
        </NavLink>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <NavLink to="/import" className="text-sm font-medium transition-colors hover:text-primary">
            Import
          </NavLink>
          <NavLink to="/visualize" className="text-sm font-medium transition-colors hover:text-primary">
            Visualize
          </NavLink>
          <NavLink to="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
            Dashboard
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;