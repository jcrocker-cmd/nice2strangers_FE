import type { ExpandedMenuProps } from '../../types/menu';
import { useState } from 'react';

const ExpandedMenu = ({MenuName, Icon, children}: ExpandedMenuProps) => {
  const [expandMenu, setExpandMenu] = useState(false);

return (
    <>
        <li>
            <div
                className="flex items-center justify-between hover:bg-gray-100 p-2 rounded cursor-pointer"
                onClick={() => setExpandMenu(!expandMenu)}
            >
                <div className="flex items-center gap-2">
                    <i className={Icon}></i>
                    <span>{MenuName}</span>
                </div>
                <i
                    className={`pi pi-chevron-down transform transition-transform duration-300 ease-in-out ${
                        expandMenu ? 'rotate-180' : 'rotate-0'
                    }`}
                ></i>
            </div>


                <ul 
                className={`
                    pl-10 space-y-2 mt-1 text-sm text-gray-600 overflow-hidden transition-all duration-300 ease-in-out
                    ${expandMenu ? 'max-h-100 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}
                `}
                >
                    {children}
                </ul>
        
        </li>
    </>
  )
}

export default ExpandedMenu