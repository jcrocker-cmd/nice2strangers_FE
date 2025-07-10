import { useState } from 'react';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Sidenav from './components/Sidenav';
import Navbar from './components/Navbar';

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            {/* Overlay for blur effect */}
            {/* {sidebarOpen && (
                <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 transition-opacity"></div>
            )} */}

            {/* Sidebar with animation */}
            <Sidenav isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Topbar & Main Content */}
            <div className="min-h-screen flex flex-col relative z-0">
                <Navbar setSidebarOpen={setSidebarOpen} />

                {/* Main content */}
                <div className="pt-20 px-6 bg-gray-100 flex-1 min-h-screen transition-all duration-300">
                    <div className="p-4 bg-white shadow rounded">
                        <h2 className="text-lg font-semibold mb-2">Welcome to your dashboard</h2>
                        <p>This is your main content area. Replace this with your routes or components.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
