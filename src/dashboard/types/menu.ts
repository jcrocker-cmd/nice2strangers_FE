
export interface MenuItemProps  {
    MenuName: string;
    Icon: string;
}

export interface ExpandedMenuProps extends MenuItemProps{
    children: React.ReactNode;
}

