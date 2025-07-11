
export interface MenuItemProps  {
    MenuName: string;
    Icon: string;
    isActive?: boolean;
    onClick?: () => void;
}

export interface ExpandedMenuProps extends MenuItemProps{
    children: React.ReactNode;
}

