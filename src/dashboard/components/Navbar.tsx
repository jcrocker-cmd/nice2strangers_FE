import { Button } from 'primereact/button';

interface NavbarProps {
    setSidebarOpen: (open: boolean) => void;
    isOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ setSidebarOpen, isOpen }) => {
    return (
        <div className="h-16 bg-white border-b px-6 flex items-center justify-between shadow-sm">
            <button onClick={() => setSidebarOpen(true)} className={`text-gray-700 cursor-pointer ${isOpen ? 'hidden' : 'block'} `}>
                <i className="pi pi-bars text-xl"></i>
            </button>
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <Button icon="pi pi-sign-out" className="p-button-text p-button-sm" />
        </div>
    );
};

export default Navbar;