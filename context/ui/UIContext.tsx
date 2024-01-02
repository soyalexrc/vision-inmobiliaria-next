import React from 'react';

interface UIContextProps {
  sideMenuOpen: boolean;
  adminMenuOpen: boolean;
  isAddingEntry: boolean;
  openSideMenu: () => void;
  currentFile: string;
  isPreviewModal: boolean;
  openPreviewModal: (file: string) => void;
  closePreviewModal: () => void;
  openAdminMenu: () => void;
  closeSideMenu: () => void;
  closeAdminMenu: () => void;
  startDragging: () => void;
  endDragging: () => void;
  setIsAddingEntry: (value: boolean) => void;
  isDragging: boolean;
  adminPanelOpen: string;
  setAdminPanelName: (value: string) => void;

  attributesPanelOpen: boolean;
  attributesPanelData: any;
  handleAttributesPanel: (action: string, data?: any) => void;
  handleCloseAttributesPanel: () => void;
  attributesTypeAction: string;
  refreshListener: any;
  onRefresh: () => void;
}

export const UIContext = React.createContext({} as UIContextProps);
