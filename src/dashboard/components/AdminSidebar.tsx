import { Avatar } from "primereact/avatar";
import "../../index.css";
import logo from "../../assets/img/logo.png";
import NormalMenu from "./menu/NormalMenu";
import ExpandedMenu from "./menu/ExpandedMenu";
import ExpandedSubMenu from "./menu/ExpandedSubMenu";

interface SidenavProps {
  isOpen: boolean;
  onClose: () => void;
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

const Sidenav = ({
  isOpen,
  onClose,
  activeMenu,
  setActiveMenu,
}: SidenavProps) => {
  return (
    <div
      className={`h-screen bg-[#191921] shadow-lg transition-all duration-300 ease-in-out overflow-hidden
    ${isOpen ? "w-72" : "w-0"}
  `}
    >
      <div
        className={`transform transition-transform duration-300 ease-in-out font-primary ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-72 flex flex-col h-full`}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Company Logo" height="40" width="40" />
            <span className="text-lg font-bold text-white">nice2strangers</span>
          </div>
          <button onClick={onClose}>
            <i className="pi pi-times text-xl text-white cursor-pointer"></i>
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto px-4 space-y-3 text-white sidebar-scroll">
          <NormalMenu
            MenuName="Dashboard"
            Icon="pi pi-home"
            isActive={activeMenu === "Dashboard"}
            onClick={() => setActiveMenu("Dashboard")}
          />
          <ExpandedMenu
            MenuName="My Shop"
            Icon="pi pi-shop"
            isActive={[ "Items", "Chart"].includes(activeMenu)}
          >
            <ExpandedSubMenu
              MenuName="Items"
              Icon="pi pi-th-large"
              onClick={() => setActiveMenu("Items")}
            />
            <ExpandedSubMenu
              MenuName="Chart"
              Icon="pi pi-calendar"
              onClick={() => setActiveMenu("Chart")}
            />
          </ExpandedMenu>

          <NormalMenu
            MenuName="Transactions"
            Icon="pi pi-home"
            isActive={activeMenu === "Transactions"}
            onClick={() => setActiveMenu("Transactions")}
          />

          <NormalMenu
            MenuName="Calendar"
            Icon="pi pi-calendar"
            isActive={activeMenu === "Calendar"}
            onClick={() => setActiveMenu("Calendar")}
          />

          <NormalMenu
            MenuName="Inquiry"
            Icon="pi pi-question-circle"
            isActive={activeMenu === "Inquiry"}
            onClick={() => setActiveMenu("Inquiry")}
          />

          <NormalMenu
            MenuName="Newsletter"
            Icon="pi pi-envelope"
            isActive={activeMenu === "Newsletter"}
            onClick={() => setActiveMenu("Newsletter")}
          />

          <h2 className="pt-3">General</h2>

          <NormalMenu
            MenuName="Account"
            Icon="pi pi-user"
            isActive={activeMenu === "Account"}
            onClick={() => setActiveMenu("Account")}
          />
          <NormalMenu
            MenuName="Settings"
            Icon="pi pi-cog"
            isActive={activeMenu === "Settings"}
            onClick={() => setActiveMenu("Settings")}
          />

          <NormalMenu
            MenuName="Log Out"
            Icon="pi pi-sign-out"
            isActive={activeMenu === "Log Out"}
            onClick={() => setActiveMenu("Log Out")}
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 bg-[#1e1e2f] flex items-center gap-2">
          <Avatar
            image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
            shape="circle"
          />
          <span className="text-white font-semibold">Brandon Granberg</span>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
