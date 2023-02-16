import React from 'react';
import {ConfirmationState} from "./";
import {ModalContent} from '../../interfaces'

type AuthActionType =
  | { type: 'Confirmation - Show Confirmation Modal', payload: ModalContent }
  | { type: 'Confirmation - Hide Confirmation Modal' }

export const confirmationReducer = (state: ConfirmationState, action: AuthActionType): ConfirmationState => {
  switch (action.type) {

    case 'Confirmation - Show Confirmation Modal':
      return {
        ...state,
        showConfirmationModal: true,
        title: action.payload.title,
        element: action.payload.element
      }

    case 'Confirmation - Hide Confirmation Modal':
      return {
        ...state,
        showConfirmationModal: false,
      }

    default:
      return state;
  }
}
