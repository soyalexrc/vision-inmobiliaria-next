import React from 'react';

interface UIContextProps {
  sideMenuOpen: boolean;
  adminMenuOpen: boolean;
  isAddingEntry: boolean;
  openSideMenu: () => void;
  openAdminMenu: () => void;
  closeSideMenu: () => void;
  closeAdminMenu: () => void;
  startDragging: () => void;
  endDragging: () => void;
  setIsAddingEntry: (value: boolean) => void;
  isDragging: boolean;
}

export const UIContext = React.createContext({} as UIContextProps)
