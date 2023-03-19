import React from 'react';
import {ConfirmationContext, confirmationReducer} from "./";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";


export interface ConfirmationState {
  showConfirmationModal: boolean;
  title: string;
  element: string
}

const CONFIRMATION_INITIAL_STATE = {
  showConfirmationModal: false,
  title: '',
  element: ''
}

export const ConfirmationProvider: React.FC<{children: JSX.Element}> = ({children}) => {
  const resolver: React.MutableRefObject<any> = React.useRef();

  const [state, dispatch] = React.useReducer(confirmationReducer, CONFIRMATION_INITIAL_STATE)

    const toggleModal = (title: string, element: string): Promise<any> => {
    dispatch({type: 'Confirmation - Show Confirmation Modal', payload: {title, element}} )

    return new Promise(function (resolve: any) {
      resolver.current = resolve;
    });
  };

  const handleOk = () => {
    resolver.current && resolver.current(true);
    dispatch({type: 'Confirmation - Hide Confirmation Modal'})
  };

  const handleCancel = () => {
    resolver.current && resolver.current(false);
    dispatch({type: 'Confirmation - Hide Confirmation Modal'})
  };

  const providerValue = React.useMemo(() => ({
    ...state,
    toggleModal,
  }), [state])


  return (
    <ConfirmationContext.Provider value={providerValue}>
      {children}
      <Dialog
        open={state.showConfirmationModal}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ borderBottom: '1px solid #ddd' }} id="alert-dialog-title" align={'center'}>
          {state.title}
        </DialogTitle>
        <DialogContent sx={{ mt: 2, minHeight: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography align='center' fontSize='22px'>
            {state.element}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant='contained' color='error' onClick={handleCancel}>Cancelar</Button>
          <Button variant='contained' color='info' onClick={handleOk} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmationContext.Provider>
  )
}
