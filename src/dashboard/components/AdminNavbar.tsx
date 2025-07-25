import { Avatar } from "primereact/avatar";

interface NavbarProps {
  setSidebarOpen: (open: boolean) => void;
  isOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ setSidebarOpen, isOpen }) => {
  return (
    <div className="h-16 bg-[#f7f7f7] px-6 flex items-center justify-between shadow-sm rounded-lg">
      <button
        onClick={() => setSidebarOpen(true)}
        className={`text-gray-700 cursor-pointer ${
          isOpen ? "hidden" : "block"
        } `}
      >
        <i className="pi pi-bars text-xl"></i>
      </button>
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center gap-2">
        <Avatar
          image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
          shape="circle"
        />
        <div className="flex flex-col">
          <span className="text-gray-600 text-sm font-medium">Brandon Granberg</span>
          <span className="text-gray-600 text-xs">narbjajc@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
