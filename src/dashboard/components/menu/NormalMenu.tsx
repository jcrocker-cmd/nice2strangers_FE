import type { MenuItemProps } from "../../types/menu"

const NormalMenu = ({MenuName, Icon}: MenuItemProps) => {
  return (
    <>
        <li className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded cursor-pointer">
            <i className={Icon}></i>
            <span>{MenuName}</span>
        </li>
    </>
  )
}

export default NormalMenu