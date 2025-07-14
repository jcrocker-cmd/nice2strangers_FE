import type { ExpandedMenuProps } from "../../types/menu";
import { useState } from "react";

const ExpandedMenu = ({
  MenuName,
  Icon,
  children,
  isActive,
  onClick,
}: ExpandedMenuProps) => {
  const [expandMenu, setExpandMenu] = useState(false);

  return (
    <>
        <div
          className={`rounded-lg cursor-pointer transition-colors text-sm
        ${
          isActive
            ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white border border-[#5a5a5a]"
            : "hover:bg-gradient-to-r from-purple-600 to-blue-500 text-white/80 border-[#5a5a5a] bg-[#23232c] border"
        }
      `}
          onClick={onClick}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between py-4 px-5"
            onClick={() => setExpandMenu(!expandMenu)}
          >
            <div className="flex items-center gap-2">
              <i className={Icon}></i>
              <span>{MenuName}</span>
            </div>
            <i
              className={`pi pi-chevron-down transform transition-transform duration-400 ease-in-out ${
                expandMenu ? "rotate-180" : "rotate-0"
              }`}
            ></i>
          </div>

          {/* Submenu inside the same div, so it inherits hover */}
          <ul
            className={`pl-10 pr-5 text-sm text-white/80 transition-all duration-300 ease-in-out overflow-hidden ${
              expandMenu
                ? "max-h-[500px] opacity-100 py-4 pt-2 "
                : "max-h-0 opacity-0"
            }`}
          >
            {children}
          </ul>
        </div>
    </>
  );
};

export default ExpandedMenu;
