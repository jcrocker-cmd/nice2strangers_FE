import type { MenuItemProps } from "../../types/menu";

const ExpandedSubMenu = ({ MenuName, Icon, onClick }: MenuItemProps) => {
  return (
    <>
      <li
        onClick={onClick}
        className="flex justify-between items-center text-white p-2 rounded cursor-pointer text-sm"
      >
        <div className="flex gap-2">
          <i className={Icon}></i>
          <span>{MenuName}</span>
        </div>
        <span className="min-w-[20px] h-[20px] px-2 flex items-center rounded-full bg-[#b39426] text-white text-xs">
          9+
        </span>
      </li>
    </>
  );
};

export default ExpandedSubMenu;
