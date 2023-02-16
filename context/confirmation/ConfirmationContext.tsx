import React from 'react';
interface ConfirmationContextProps {
  showConfirmationModal: boolean;
  toggleModal: (title: string, element: string) => Promise<any>;
}

export const ConfirmationContext = React.createContext({} as ConfirmationContextProps)
