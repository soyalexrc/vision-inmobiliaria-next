import React from 'react';
import {UIContext, uiReducer} from "./";

export interface UIState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  adminMenuOpen: boolean;
  adminPanelOpen: string;
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  adminMenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
  adminPanelOpen: ''
}

export const UIProvider: React.FC<{children: JSX.Element}> = ({children}) => {

  const [state, dispatch] = React.useReducer(uiReducer, UI_INITIAL_STATE)
  const openSideMenu = () => dispatch({ type: 'UI - Open Sidebar' })
  const closeSideMenu = () => dispatch({ type: 'UI - Close Sidebar' })
  const openAdminMenu = () => dispatch({ type: 'UI - Open Admin Sidebar' })
  const closeAdminMenu = () => dispatch({ type: 'UI - Close Admin Sidebar' })
  const startDragging = () => dispatch({ type: 'UI - Start Dragging' })
  const endDragging = () => dispatch({ type: 'UI - End Dragging' })

  const setIsAddingEntry = (value: boolean) => dispatch({ type: 'UI - Set IsAddingEntry', payload: value })

  const setAdminPanelName = (value: string) => {
    if (state.adminPanelOpen === value) {
      dispatch({type: 'UI - Set Admin Panel Name', payload: ''})
    } else {
      dispatch({type: 'UI - Set Admin Panel Name', payload: value})
    }
  }

  const providerValue = React.useMemo(() => ({
    ...state,
    openSideMenu,
    closeSideMenu,
    setIsAddingEntry,
    startDragging,
    endDragging,
    closeAdminMenu,
    openAdminMenu,
    setAdminPanelName
  }), [state])
  return (
    <UIContext.Provider value={providerValue}>
      {children}
    </UIContext.Provider>
  )
}
