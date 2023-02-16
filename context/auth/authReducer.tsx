import React from 'react';
import {AuthState} from "./";
import {User} from '../../interfaces'

type AuthActionType =
  | { type: 'Auth - Login', payload: User }
  | { type: 'Auth - Loading State', payload: boolean }
  | { type: 'Auth - Logout' }
  | { type: 'Auth - Set User', payload: User }

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
  switch (action.type) {

    case 'Auth - Login':
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload
      }

    case 'Auth - Logout':
      return {
        ...state,
        isAuthenticated: false,
      }

    case 'Auth - Loading State':
      return {
        ...state,
        loading: action.payload
      }

    case 'Auth - Set User':
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true
      }

    default:
      return state;
  }
}
