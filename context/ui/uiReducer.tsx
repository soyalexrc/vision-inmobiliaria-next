import React from 'react';
import {UIState} from "./";

type UIActionType =
  | { type: 'UI - Open Sidebar' }
  | { type: 'UI - Close Sidebar' }
  | { type: 'UI - Open Admin Sidebar' }
  | { type: 'UI - Close Admin Sidebar' }
  | { type: 'UI - Set IsAddingEntry', payload: boolean }
  | { type: 'UI - Start Dragging' }
  | { type: 'UI - End Dragging' }
  | { type: 'UI - Set Admin Panel Name', payload: string }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'UI - Open Sidebar':
      return {
        ...state,
        sideMenuOpen: true
      }
    case 'UI - Open Admin Sidebar':
      return {
        ...state,
        adminMenuOpen: true
      }

    case 'UI - Close Admin Sidebar':
      return {
        ...state,
        adminMenuOpen: false
      }

    case 'UI - Close Sidebar':
      return {
        ...state,
        sideMenuOpen: false
      }

    case 'UI - Set IsAddingEntry':
      return {
        ...state,
        isAddingEntry: action.payload
      }

    case 'UI - Start Dragging':
      return {
        ...state,
        isDragging: true
      }

    case 'UI - End Dragging':
      return {
        ...state,
        isDragging: false
      }

    case 'UI - Set Admin Panel Name':
      return {
        ...state,
        adminPanelOpen: action.payload
      }

    default:
      return state;
  }
}
