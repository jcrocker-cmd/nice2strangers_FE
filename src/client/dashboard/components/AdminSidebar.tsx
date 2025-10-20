import { Avatar } from "primereact/avatar";
import "../../../index.css";
import logo from "../../../assets/img/logo.png";
import NormalMenu from "./menu/NormalMenu";
import { getUser } from "../../../constants/user";

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
  const { firstName, lastName } = getUser();

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
            MenuName="My Cart"
            Icon="pi pi-shopping-cart"
            isActive={activeMenu === "My Cart"}
            onClick={() => setActiveMenu("My Cart")}
          />

          <NormalMenu
            MenuName="Order History"
            Icon="pi pi-envelope"
            isActive={activeMenu === "Order History"}
            onClick={() => setActiveMenu("Order History")}
          />

          {/* <NormalMenu
            MenuName="Payment Methods"
            Icon="pi pi-question-circle"
            isActive={activeMenu === "Payment Methods"}
            onClick={() => setActiveMenu("Payment Methods")}
          /> */}

          {/* <NormalMenu
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
          /> */}
          <NormalMenu
            MenuName="Log Out"
            Icon="pi pi-sign-out"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("email");
              localStorage.removeItem("role");
              window.location.href = "/login";
            }}
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 bg-[#1e1e2f] flex items-center gap-2">
          <Avatar
            image="https://res.cloudinary.com/dnh4lkqlw/image/upload/v1760962315/User-Avatar-Profile-PNG-Pic-Clip-Art-Background_o6yf5w.png"
            shape="circle"
          />
          <span className="text-white font-semibold">
            {firstName} {lastName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
