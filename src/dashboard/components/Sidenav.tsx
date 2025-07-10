import { Avatar } from 'primereact/avatar';
import React from 'react';
import '../../index.css';
import logo from '../../assets/img/logo.png'
import NormalMenu from './menu/NormalMenu';
import ExpandedMenu from './menu/ExpandedMenu';
import ExpandedSubMenu from './menu/ExpandedSubMenu';

interface SidenavProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidenav: React.FC<SidenavProps> = ({ isOpen, onClose }) => {
    return (
        <div
            className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="Company Logo" height="40" width="40"/>
                    <span className="text-lg font-bold text-primary">nice2strangers</span>
                </div>
                <button onClick={onClose}>
                    <i className="pi pi-times text-xl text-gray-600"></i>
                </button>
            </div>

            {/* Nav Items */}
            <ul className="p-4 space-y-2 text-gray-700 flex-1 overflow-y-auto h-full sidebar-scroll">
                <NormalMenu MenuName="Dashboard" Icon="pi pi-home" />
                <ExpandedMenu MenuName="My Shop" Icon="pi pi-shop">
                    <ExpandedSubMenu MenuName='Orders' Icon='pi pi-bookmark' />
                    <ExpandedSubMenu MenuName='Items' Icon='pi pi-calendar' />
                    <ExpandedSubMenu MenuName='Chart' Icon='pi pi-calendar' />
                </ExpandedMenu>
                <NormalMenu MenuName="Team" Icon="pi pi-users" />
                <NormalMenu MenuName="Calendar" Icon="pi pi-calendar" />
                <ExpandedMenu MenuName="Calendar" Icon="pi pi-chart-line">
                    <ExpandedSubMenu MenuName='Menu 1' Icon='pi pi-bookmark' />
                    <ExpandedSubMenu MenuName='Menu 2' Icon='pi pi-calendar' />
                    <ExpandedSubMenu MenuName='Menu 2' Icon='pi pi-calendar' />
                    <ExpandedSubMenu MenuName='Menu 2' Icon='pi pi-calendar' />
                    <ExpandedSubMenu MenuName='Menu 2' Icon='pi pi-calendar' />
                    <ExpandedSubMenu MenuName='Menu 2' Icon='pi pi-calendar' />
                    <ExpandedSubMenu MenuName='Menu 2' Icon='pi pi-calendar' />
                    <ExpandedSubMenu MenuName='Menu 2' Icon='pi pi-calendar' />
                </ExpandedMenu>
                <NormalMenu MenuName="Calendar" Icon="pi pi-calendar" />
            </ul>

            {/* Footer */}
            <div className="absolute bottom-0 w-full p-4 border-t bg-white flex items-center gap-2 cursor-pointer">
                <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
                <span className="font-semibold">Brandon Granberg</span>
            </div>
        </div>
    );
};

export default Sidenav;
