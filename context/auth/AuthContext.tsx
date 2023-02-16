import React from 'react';
import {User} from '../../interfaces'
interface AuthContextProps {
  login: (data: {email: string, password: string}) => void;
  logout: () => void;
  loading: boolean;
  currentUser: User ;
  isAuthenticated: boolean;
}

export const AuthContext = React.createContext({} as AuthContextProps)
