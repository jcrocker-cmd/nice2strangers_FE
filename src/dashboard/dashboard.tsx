import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { renderContent } from "./components/content/index";

import { useState } from "react";

import Sidenav from "./components/AdminSidebar";
import Navbar from "./components/AdminNavbar";

import { BaseSpinner } from "./components/common/ProgressSpinner";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  return (
    <>
     {isGlobalLoading && <BaseSpinner />}
    <div className="flex h-screen w-full">
      {/* Sidebar (fixed width) */}
      <Sidenav
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {/* Right side: navbar + main stacked vertically */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Navbar (top row) */}
        <nav className="p-4">
          <Navbar setSidebarOpen={setSidebarOpen} isOpen={sidebarOpen} />
        </nav>

        {/* Main content (bottom row) */}
        <main className="overflow-y-auto bg-white p-4 main-scroll">
          <div className="p-6 bg-[#f7f7f7] shadow rounded">
            {renderContent(activeMenu, setIsGlobalLoading)}
          </div>
        </main>
      </div>
    </div>
    </>
  );
}
