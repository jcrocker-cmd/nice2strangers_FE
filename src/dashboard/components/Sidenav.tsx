import { Avatar } from "primereact/avatar";
import React from "react";
import "../../index.css";
import logo from "../../assets/img/logo.png";
import NormalMenu from "./menu/NormalMenu";
import ExpandedMenu from "./menu/ExpandedMenu";
import ExpandedSubMenu from "./menu/ExpandedSubMenu";
import { useState } from "react";

interface SidenavProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidenav: React.FC<SidenavProps> = ({ isOpen, onClose }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-72 bg-[#191921] shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
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

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto h-full sidebar-scroll">
          <ul className="p-4 space-y-3 text-gray-700">
            <NormalMenu
              MenuName="Dashboard"
              Icon="pi pi-home"
              isActive={activeMenu === "Dashboard"}
              onClick={() => setActiveMenu("Dashboard")}
            />
            <ExpandedMenu
              MenuName="My Shop"
              Icon="pi pi-shop"
              isActive={activeMenu === "My Shop"}
              onClick={() => setActiveMenu("My Shop")}
            >
              <ExpandedSubMenu MenuName="Orders" Icon="pi pi-bookmark" />
              <ExpandedSubMenu MenuName="Items" Icon="pi pi-calendar" />
              <ExpandedSubMenu MenuName="Chart" Icon="pi pi-calendar" />
            </ExpandedMenu>
            <NormalMenu
              MenuName="Team"
              Icon="pi pi-users"
              isActive={activeMenu === "Team"}
              onClick={() => setActiveMenu("Team")}
            />
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full p-4 border-t bg-white flex items-center gap-2 cursor-pointer shrink-0 rounded-t-lg">
        <Avatar
          image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
          shape="circle"
        />
        <span className="font-semibold">Brandon Granberg</span>
      </div>
    </div>
  );
};

export default Sidenav;
