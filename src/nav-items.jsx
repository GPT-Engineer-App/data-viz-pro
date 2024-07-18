import { Home, BarChart2, PieChart } from "lucide-react";
import ImportPage from "./pages/ImportPage";
import VisualizePage from "./pages/VisualizePage";
import DashboardPage from "./pages/DashboardPage";

export const navItems = [
  {
    title: "Import",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <ImportPage />,
  },
  {
    title: "Visualize",
    to: "/visualize",
    icon: <BarChart2 className="h-4 w-4" />,
    page: <VisualizePage />,
  },
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: <PieChart className="h-4 w-4" />,
    page: <DashboardPage />,
  },
];