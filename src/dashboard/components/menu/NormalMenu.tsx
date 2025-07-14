import type { MenuItemProps } from "../../types/menu";

const NormalMenu = ({ MenuName, Icon, isActive, onClick }: MenuItemProps) => {
  return (
    <>
      <li
        className={`flex items-center gap-2 py-4 px-5 rounded-lg cursor-pointer transition-colors text-sm
        ${
          isActive
            ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white border border-[#5a5a5a]"
            : "hover:bg-gradient-to-r from-purple-600 to-blue-500 text-white/80 border-[#5a5a5a] bg-[#23232c] border"
        }
      `}
        onClick={onClick}
      >
        <i className={Icon}></i>
        <span>{MenuName}</span>
      </li>
    </>
  );
};

export default NormalMenu;
