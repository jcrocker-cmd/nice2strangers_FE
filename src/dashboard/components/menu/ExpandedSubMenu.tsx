import type { MenuItemProps } from "../../types/menu"

const ExpandedSubMenu = ({MenuName, Icon}: MenuItemProps) => {
  return (
    <>
        <li className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded cursor-pointer">
            <i className={Icon}></i>
            <span>{MenuName}</span>
        </li>
    </>
  )
}

export default ExpandedSubMenu