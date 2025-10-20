import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import type { DropdownItemProps } from "../data/navbarDropDown";
import "../../../assets/css/navabardropdown.css";

interface DropdownProps {
  title: string;
  dropitems: DropdownItemProps[];
  activePath: string;
}

const NavbarDropDown: React.FC<DropdownProps> = ({
  title,
  dropitems,
  activePath,
}) => {
  const location = useLocation();

  return (
    <li
      className={`dropdown ${location.pathname === activePath ? "active" : ""}`}
    >
      <Link to={activePath}>
        <span className="dropdown-toggle">
          {title.toUpperCase()}
          <span className="arrow">
            <MdKeyboardArrowDown />
          </span>
        </span>
      </Link>
      <ul className="dropdown-menu w-fit">
        {dropitems.map((item, index) => (
          <span key={index}>
            <Link to={item.link} className="whitespace-nowrap">
              {item.label}
            </Link>
          </span>
        ))}
      </ul>
    </li>
  );
};

export default NavbarDropDown;
