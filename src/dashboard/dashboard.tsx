import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { renderContent } from "./components/pages/Contents";

import { useState } from "react";

import Sidenav from "./components/Sidenav";
import Navbar from "./components/Navbar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar (fixed width) */}
      <Sidenav
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {/* Right side: navbar + main stacked vertically */}
      <div className="flex flex-col flex-1">
        {/* Navbar (top row) */}
        <Navbar setSidebarOpen={setSidebarOpen} isOpen={sidebarOpen} />

        {/* Main content (bottom row) */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <div className="p-4 bg-white shadow rounded">
            {renderContent(activeMenu)}
          </div>
        </main>
      </div>
    </div>
  );
}
